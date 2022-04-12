const express = require("express")
const YoutubeMusicApi = require("youtube-music-api")
const ytdl = require("ytdl-core")

const ytApi = new YoutubeMusicApi()
ytApi.initalize()

const app = express()
const port = process.env.PORT

var bodyParser = require("body-parser")
const cors = require("cors")
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.static(__dirname + "/build"))

app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"))

app.get("/api", (_, res) => res.send("Yay api is running"))

app.get("/api/search", async (req, res) => {
  const searchQuery = req.query.q
  res.json((await ytApi.search(searchQuery, "song")).content.slice(0, 6))
})

app.get("/api/getMusic", async (req, res) => {
  const videoId = req.query.v
  res.redirect(
    (
      await ytdl.getInfo("https://www.youtube.com/watch?v=" + videoId)
    ).formats.filter((_) => _.hasVideo === false)[0].url
  )
})

app.get("*", (req, res) => res.sendFile(__dirname + "/build/index.html"))

app.listen(port, () => console.log(`Server started at port ${port}`))
