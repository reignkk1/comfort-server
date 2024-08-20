import express from "express";
import cors from "cors";
import { connection } from "./connection.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json({ extended: true }));

app.get("/comments", (req, res) => {
  const sqlQuery = `SELECT * FROM comments`;

  connection.query(sqlQuery, (error, results, fields) => {
    if (error) return console.log(error);

    res.status(200).send(results);
  });
});

app.post("/comment", (req, res) => {
  const sqlQuery = ``;
  console.log(req.body);
  // body로 데이터가 잘 넘어옴. 이제 sqlQuery문으로 데이터베이스에 데이터를 insert
  res.send("성공");
});

app.listen(port, () => {
  console.log("서버 작동 중..");
});
