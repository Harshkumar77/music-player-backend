const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const YoutubeMusicApi = require("youtube-music-api");
const promisify = require("util").promisify;
const exec = promisify(require("node:child_process").exec);
const ytdl = require("ytdl-core");
const { createWriteStream } = require("node:fs");

const api = new YoutubeMusicApi();
(async () => {
  await api.initalize();
  const apiResp = await api.search("cutiepie", "song");
  //   console.log(apiResp.content.length);
  //   console.log(apiResp.content[0]);
  ytdl("http://www.youtube.com/watch?v=" + apiResp.content[0].videoId).pipe(
    createWriteStream("a.mkv")
  );
  //   console.log(
  //     (
  //       await exec(
  //         "yt-dlp http://www.youtube.com/watch?v=" +
  //           apiResp.content[0].videoId +
  //           " -f 139 -g"
  //       )
  //     ).stdout
  //   );
})();
