import cors from "cors";
import express from "express";
import { AppDataSource } from "./datasource";

const app = express();
const PORT = 8888;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
