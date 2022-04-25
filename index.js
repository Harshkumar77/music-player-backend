import "dotenv/config"
import express from "express"
import YoutubeMusicApi from "youtube-music-api"
import ytdl from "ytdl-core"

const ytApi = new YoutubeMusicApi()
ytApi.initalize()

const app = express()
const port = process.env.PORT

app.use(express.static("./build"))

app.get("/", (req, res) => res.sendFile("./build/index.html"))

app.get("/api", (_, res) => res.send("Yay api is running"))

app.get("/api/search", async (req, res) => {
  const searchQuery = req.query.q
  res.json((await ytApi.search(searchQuery, "song")).content.slice(0, 10))
})

app.get("/api/getMusic", async (req, res) => {
  const videoId = req.query.v

  const videoInfo = (await ytdl.getInfo(videoId)).formats.filter(
    (x) => x.hasAudio && !x.hasVideo
  )[0]

  const range = req.headers.range
  if (!range) {
    res.status(400).send("Requires Range header")
    return
  }
  const videoSize = videoInfo.contentLength
  const CHUNK_SIZE = 10 ** 5
  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
  const contentLength = end - start + 1
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  }
  res.writeHead(206, headers)

  ytdl("https://www.youtube.com/watch?v=" + videoId, {
    filter: (_) => _.itag === videoInfo.itag,
    range: {
      start,
      end,
    },
  }).pipe(res)
})

app.get("*", (req, res) => res.sendFile(__dirname + "/build/index.html"))

app.listen(port, () => console.log(`Server started at port ${port}`))
