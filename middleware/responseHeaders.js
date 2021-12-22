/**
 * add cache headers for vercel edge network to cache pages
 */
export default (_, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=604800')
  next()
}
