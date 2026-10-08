
import { allDocumentsSlugsQuery } from '../../lib/queries'
import { previewClient } from '../../lib/sanity.server'

let splitSlug = (slug, document) => {

  if(slug === 'home') return '/'

  if(document._type === 'projects') return `/projects/${slug}`

  let split = slug.split("__");
  
  if(split.length === 1) {
    return `/${split[0]}`
  } else if (split.length === 2) {
    return `/${split[0]}/${split[1]}`
  } else if(split.length === 3) {
    return `/${split[0]}/${split[1]}/${split[2]}`
  } else {
    return `/${split[0]}/${split[1]}/${split[2]}/${split[3]}`
  }
}

// Keep preview mode short-lived so it only covers the page being previewed,
// not the visitor's whole browsing session afterward (which would otherwise
// bypass the CDN cache for every page they click through next).
const PREVIEW_MAX_AGE_SECONDS = 120

function redirectToPreview(res, slug, document, extraQuery = '') {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({}, { maxAge: PREVIEW_MAX_AGE_SECONDS })
  // Redirect to a preview capable route
  res.writeHead(307, { Location: splitSlug(slug, document) + extraQuery })
  res.end()
}

export default async function preview(req, res) {
  const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET
  // Only require a secret when in production
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new TypeError(`Missing SANITY_STUDIO_PREVIEW_SECRET`)
  }

  // Check the secret if it's provided, enables running preview mode locally before the env var is setup
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  // Forwarded to the destination page, e.g. so the Studio's title-position
  // picker still lands in picker mode after the preview redirect.
  const extraQuery = req.query.picker === 'true' ? '?picker=true' : ''

  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, '/')
  }

  // Check if the post with the given `slug` exists
  const document = await previewClient.fetch(allDocumentsSlugsQuery, {
    slug: req.query.slug,
  })


  // If the slug doesn't exist prevent preview mode from being enabled
  if (!document) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, document.slug, document, extraQuery)
}
