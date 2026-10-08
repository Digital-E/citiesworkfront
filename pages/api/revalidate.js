import { isValidRequest } from '@sanity/webhook'
import { sanityClient } from '../../lib/sanity.server'
import splitSlug from '../../lib/splitSlug'

const PROJECT_SLUG_QUERY = `*[_type == "project" && _id == $id][0].slug.current`
const LEGAL_SLUG_QUERY = `*[_type == "legal" && _id == $id][0].slug.current`

const getStaleRoutes = async (type, id) => {
  switch (type) {
    case 'home':
      return ['/']
    case 'about':
      return ['/about']
    case 'project': {
      const slug = await sanityClient.fetch(PROJECT_SLUG_QUERY, { id })
      // Project title positions are picked/displayed on the homepage too
      return slug ? ['/', `/projects/${splitSlug(slug, 1)}`] : ['/']
    }
    case 'legal': {
      const slug = await sanityClient.fetch(LEGAL_SLUG_QUERY, { id })
      return slug ? [`/legal/${slug}`] : []
    }
    default:
      // menu/footer and anything else render on every page via the shared layout
      return ['/']
  }
}

const log = (msg, error) =>
  console[error ? 'error' : 'log'](`[revalidate] ${msg}`)

export default async function revalidate(req, res) {
  if (!isValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET)) {
    const invalidRequest = 'Invalid request'
    log(invalidRequest, true)
    return res.status(401).json({ message: invalidRequest })
  }

  const { _id: id, _type } = req.body
  if (typeof id !== 'string' || !id) {
    const invalidId = 'Invalid _id'
    log(invalidId, true)
    return res.status(400).json({ message: invalidId })
  }

  // Ignore draft documents to prevent excessive revalidations on every keystroke
  if (id.startsWith('drafts.')) {
    log('Draft document ignored')
    return res.status(200).json({ message: 'Draft ignored' })
  }

  log(`Resolving stale routes for _id '${id}', type '${_type}' ..`)

  try {
    const staleRoutes = await getStaleRoutes(_type, id)

    await Promise.all(
      staleRoutes.map((route) => res.unstable_revalidate(route))
    )
    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    log(updatedRoutes)
    return res.status(200).json({ message: updatedRoutes })
  } catch (err) {
    log(err.message, true)
    return res.status(500).json({ message: err.message })
  }
}
