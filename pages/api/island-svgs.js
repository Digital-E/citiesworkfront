import { sanityClient } from '../../lib/sanity.server'

const ISLAND_SVGS_QUERY = `*[_type == "home"][0].islands[]{ _key, svg }`

// Served as a plain, publicly cacheable response (not through getStaticProps),
// so it's exempt from Next.js's preview-mode cache bypass and from being
// re-billed as an ISR read on every page load.
export default async function islandSvgs(req, res) {
  const islands = await sanityClient.fetch(ISLAND_SVGS_QUERY)

  const svgByKey = Object.fromEntries(
    (islands || []).map((island) => [island._key, island.svg])
  )

  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).json(svgByKey)
}
