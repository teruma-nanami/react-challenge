import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("public"));
const PORT = 8888;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/users/:id", (req, res) => {
  res.send(`Hello, user ${req.params.id} route!`);
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.put("/users/:id", (req, res) => {
  res.send(req.body);
});

app.delete("/users/:id", (req, res) => {
  res.send(req.params.id);
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
