import "dotenv/config"
import routes from "./config/routes.config.js"
import serverConfig from "./config/server.config.js"

const { app, ytApi } = serverConfig()

routes(app, ytApi)

app.get("/api", (req, res) => res.send("Yay! api is running"))

app.listen(process.env.PORT, () =>
  console.log(`Server started at port ${process.env.PORT}`)
)
