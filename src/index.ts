import "reflect-metadata";
import dotenv from "dotenv";
import express, { Express } from "express";
import { dataSource } from "./db";
dotenv.config();

const mode = process.env.MODE;
let server: Express | null = null;

async function createServer() {
  const app = express();

  await dataSource.initialize();

  console.log("Successfully connect to database");

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  return app;
}

if (mode === "development") {
  createServer().then((server) => {
    server.listen(3000, () => {
      console.log("Server listening on port");
    });
  });
}

export async function handler(event: any) {
  // if (!server) {
  //   server = createServer();
  // }

  console.log("hello mother fuckers: ", event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda Minh!",
    }),
  };
}
