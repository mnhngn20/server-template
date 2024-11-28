import { dataSource } from "../src/db/index";

async function runMigrations() {
  await dataSource.initialize();

  await dataSource.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
  `);

  console.log(
    await dataSource.query(`
    SELECT * FROM pg_available_extensions WHERE name = 'uuid-ossp'
  `)
  );

  await dataSource.runMigrations({
    transaction: "all",
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
