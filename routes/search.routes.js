/**
 *
 * @param {import('express').Application} app
 * @param {import('youtube-music-api')} ytApi
 */
function searchRoutes(app, ytApi) {
  app.get("/api/search", async (req, res) => {
    const searchQuery = req.query.q
    try {
      console.log("hello")
      console.log(await searchResults(searchQuery, ytApi))
      res.json(await searchResults(searchQuery, ytApi))
    } catch (e) {
      res.status(500)
    }
  })
}

async function searchResults(searchQuery, ytApi) {
  const apiRes = await ytApi.search(searchQuery, "song")
  console.log(apiRes)
  const songs = apiRes.content.slice(0, 10)
  return songs
}

export default searchRoutes
