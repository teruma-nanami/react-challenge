import express from "express";
import { AppDataSource } from "./datasource";
import { User } from "./user.entity";

const app = express();
app.use(express.json());
app.use(express.static("public"));
const PORT = 8888;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/users", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: parseInt(req.params.id, 10),
  });
  res.json(user);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user: User = new User();
  user.name = name;
  user.email = email;

  const userRepository = AppDataSource.getRepository(User);
  const newUser = await userRepository.save(user);
  res.json(newUser);
});

app.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (user) {
    user.name = name;
    user.email = email;
    const updatedUser = await userRepository.save(user);
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users/:id", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (user) {
    await userRepository.remove(user);
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(PORT, () => {
  console.log(`サーバーが起動しました。http://localhost:${PORT}/`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("データベースに接続されました。");
  })
  .catch((error) => console.log("データベース接続エラー:", error));

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
