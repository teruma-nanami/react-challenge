import * as http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

const PORT = 8888;
server.listen(PORT, () => {
  console.log(`サーバーが起動しました。http://localhost:${PORT}/`);
});
