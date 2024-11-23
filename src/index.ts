import dotenv from "dotenv";
import express, { Express } from "express";
dotenv.config();

// const mode = process.env.MODE;
let server: Express | null = null;

export function createServer() {
  const app = express();

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  return app;
}

// if (mode === "development") {
//   server = createServer();
//   server.listen(3000, () => {
//     console.log("Server listening on port");
//   });
// }

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
