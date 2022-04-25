import express from "express"
import YoutubeMusicApi from "youtube-music-api"

function serverConfig() {
  const app = express()
  const ytApi = new YoutubeMusicApi()
  app.use(express.static("./build"))
  ytApi.initalize()
  return { app, ytApi }
}

export default serverConfig
