import BASE_URL from '@/config'
import nc from 'next-connect'
import db from '@/database/connection'
import User from '@/database/model/User'
const handler = nc()

function generateSiteMap (posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         <!--We manually set the two URLs we know already-->
         <url>
           <loc>${BASE_URL}</loc>
        </url>
        <url>
        <loc>${BASE_URL}/login</loc>
        </url>
        <url>
        <loc>${BASE_URL}/register</loc>
        </url>
        <url>
        <loc>${BASE_URL}/bn</loc>
        </url>
        <url>
        <loc>${BASE_URL}/bn/login</loc>
        </url>
        <url>
        <loc>${BASE_URL}/bn/register</loc>
        </url>
         ${posts
           .map(({ _id }) => {
             return `
           <url>
               <loc>${`${BASE_URL}/profile/${_id}`}</loc>
           </url>
         `
           })
           .join('')}
       </urlset>
     `
}

handler.get(async (req, res) => {
  try {
    await db.connect()
    const users = await User.find({ active: true })
      .select('profileId')
      .lean()
    const sitemap = generateSiteMap(users.map(user => ({ _id: user.profileId })))
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.send(sitemap)
  } catch (error) {
    console.log(error)
    return res.status(400).send('something went wrong')
  }
})

export default handler
