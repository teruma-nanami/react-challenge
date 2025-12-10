import cors from "cors";
import express from "express";
import { In } from "typeorm";
import { AppDataSource } from "./datasource";
import { List } from "./entities/list.entity";

const app = express();
const PORT = 8888;
app.use(express.json());
app.use(cors());

const listRepository = AppDataSource.getRepository(List);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/lists", async (req, res) => {
  try {
    const lists = await listRepository.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: "DB取得エラー" });
  }
});

app.post("/lists", async (req, res) => {
  try {
    const { title } = req.body;
    const maxPositionList = await listRepository.find({
      order: { position: "ASC" },
      take: 1,
    });
    const maxPosition = maxPositionList[0];
    const nextPosition = maxPosition != null ? maxPosition.position + 1 : 0;

    const newList = await listRepository.save({
      title,
      position: nextPosition,
    });
    res.status(201).json(newList);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

app.put("/lists", async (req, res) => {
  try {
    const { lists } = req.body;

    const listsArray = Array.isArray(lists) ? lists : [lists];
    for await (const list of listsArray) {
      await listRepository.save(list);
    }

    const updatedLists = await listRepository.findBy({
      id: In(listsArray.map((list) => list.id)),
    });

    res.status(200).json(updatedLists);
  } catch (error) {
    console.error("Error updating lists:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

app.delete("/lists/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingList = await listRepository.findOne({ where: { id } });
    if (!existingList) {
      return res.status(404).json({ error: "List not found" });
    }
    await listRepository.delete(id);

    res.status(204).send({ message: "List deleted successfully" });
  } catch (error) {
    console.error("Error deleting list:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
