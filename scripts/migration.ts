import "@/config/dotenv";
import { dataSource } from "../src/db/dataSource";

async function runMigrations() {
  await dataSource.initialize();

  // Add extension for generating id postgresql
  await dataSource.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
  `);

  await dataSource.runMigrations({
    transaction: "each",
  });
}

runMigrations()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
