import "reflect-metadata";
import "@/config/dotenv";
import express, { Express } from "express";
import { dataSource } from "@/db/dataSource";
import { APP_CONFIG } from "./config";

const mode = process.env.MODE;
let server: Express | null = null;

async function createServer() {
  const app = express();

  await dataSource.initialize();

  console.log("Successfully connect to database!");

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  return app;
}

if (mode === "development") {
  createServer().then((server) => {
    server.listen(APP_CONFIG.devPort, () => {
      console.log("Server listening on port ", APP_CONFIG.devPort);
    });
  });
}

export async function handler(event: any) {
  if (!server) {
    server = await createServer();
  }

  console.log("hello mother fuckers: ", event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda Minh!",
    }),
  };
}
