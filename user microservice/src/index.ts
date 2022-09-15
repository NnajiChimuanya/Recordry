import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  console.log("Recordry user microservice");
  res.send("Recordry user microservice");
});

app.listen(3000, () => console.log("Hello"));
