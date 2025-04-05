import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import router from "./routes.js";
import "./dbConfig.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

https.createServer(
  {
    cert: fs.readFileSync("certificate/code.cert"),
    key: fs.readFileSync("certificate/code.key")
  }, app
).listen(3001, () => console.log("Rodando em https"));
