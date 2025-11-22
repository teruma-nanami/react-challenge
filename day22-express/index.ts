import express from "express";

const app = express();
const PORT = 8888;

app.get("/", (req, res) => {
  res.send("Hello, live Server!");
});

app.listen(PORT, () => {
  console.log(`サーバーが起動しました。http://localhost:${PORT}/`);
});

// 以下は純粋なNode.jsのHTTPモジュールを使った例です。
// expressを使わない場合はこちらを参考にしてください。

// import * as http from "http";

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello, World!\n");
// });

// const PORT = 8888;
// server.listen(PORT, () => {
//   console.log(`サーバーが起動しました。http://localhost:${PORT}/`);
// });
