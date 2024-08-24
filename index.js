import express from "express";
import requestIp from "request-ip";
import cors from "cors";
import { connection } from "./connection.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json({ extended: true }));

app.get("/comments", (_, res) => {
  const sqlQuery = `SELECT * FROM comments`;

  connection.query(sqlQuery, (error, results) => {
    if (error) return console.log(error);

    res.status(200).send(results);
  });
});

app.post("/comment", (req, res) => {
  const { nickname, password, text } = req.body;
  const reqIp = requestIp.getClientIp(req);
  const sqlQuery = `INSERT INTO comments(nickname,password,text,reqIp) VALUES('${nickname}','${password}','${text}','${reqIp}')`;

  connection.query(sqlQuery, (error, results) => {
    if (error) return console.log(error);

    const id = results.insertId;

    res.status(200).json({ id, nickname, password, text, reqIp });
  });
});

app.delete("/comment/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE FROM comments WHERE id=${id}`;

  connection.query(sqlQuery, (error, results) => {
    if (error) return console.log(error);

    res.status(200).send("success");
  });
});

app.listen(port, "0.0.0.0");
