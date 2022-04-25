import ytdl from "ytdl-core"

/**
 *
 * @param {import('express').Application} app
 */
function streamRoutes(app) {
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
}

export default streamRoutes
