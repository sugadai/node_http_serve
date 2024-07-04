import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const server = http.createServer();

server.on("request", async (req, res) => {
  // Content-Type is important for browsers.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  try {
    if (req.url === undefined) throw new Error("req.url is undefined");
    const filePath = "public" + req.url;
    const file = await fs.readFile(path.join(path.resolve(), filePath));
    const mimeTypes: { [key: string]: string } = {
      ".html": "text/html",
      ".jpg": "image/jpeg",
      ".json": "text/json",
      ".ico": "image/x-icon",
    };
    const extname = String(path.extname(req.url)).toLowerCase();
    const contentType: string =
      mimeTypes[extname] || "application/octet-stream";

    res.writeHead(200, { "content-type": contentType });
    res.end(file, "utf-8");
  } catch (err) {
    console.error("error : ", err);
    const error = err as NodeJS.ErrnoException;
    if (error.code === "ENOENT") {
      res.writeHead(404, { "content-type": "text/plain" });
      return res.end("404 Not Found");
    } else {
      res.writeHead(500, { "Content-type": "text/plain" });
      return res.end("500 Internal Server Error");
    }
  }
});

server.on("listening", () => {
  console.log("start listening!");
});

// Start listening 12345 port of localhost (127.0.0.1).

const port = process.env.PORT ?? 12345;
server.listen(port, () => {
  console.log("listening on http://localhost:12345/");
});
console.log("run server.js");
