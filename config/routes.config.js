import clientRoutes from "../routes/client.routes.js"
import searchRoutes from "../routes/search.routes.js"
import streamRoutes from "../routes/stream.routes.js"

/**
 *
 * @param {import('express').Application} app
 * @param {import('youtube-music-api')} ytApi
 */
function routes(app, ytApi) {
  searchRoutes(app, ytApi)
  streamRoutes(app)
  clientRoutes(app)
}
export default routes
