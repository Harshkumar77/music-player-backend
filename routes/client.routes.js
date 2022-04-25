/**
 *
 * @param {import('express').Application} app
 */
function clientRoutes(app) {
  app.get("/", (req, res) => res.sendFile("./build/index.html"))
}

export default clientRoutes
