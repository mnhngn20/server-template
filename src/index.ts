import "reflect-metadata";
import "@/config/dotenv";
import express from "express";
import { dataSource } from "@/db/dataSource";
import { APP_CONFIG } from "./config";
import { createServer, proxy } from "aws-serverless-express";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

import { Server } from "http";

let server: Server | null = null;

async function initExpressApp() {
  const app = express();

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  await dataSource.initialize();

  console.log("Successfully connect to database!");

  app.get("/", (req, res) => {
    console.log("i was called: dit con me....?");
    res.send("hello world 2");
  });

  return app;
}

async function bootstrapServer() {
  if (!server) {
    const app = await initExpressApp();
    server = createServer(app);
  }

  return server;
}

if (APP_CONFIG.mode === "development") {
  initExpressApp()
    .then((app) => {
      app.listen(APP_CONFIG.devPort, () => {
        console.log("Server listening on port ", APP_CONFIG.devPort);
      });
    })
    .catch((err) => {
      console.error("Failed to start development server:", err);
    });
}

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  const server = await bootstrapServer();

  const result = await proxy(server, event, context, "PROMISE").promise;

  console.log("result from server", result);

  return result;
}
