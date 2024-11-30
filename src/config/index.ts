export const APP_CONFIG = {
  devPort: 3000,
  dbPort: process.env.PG_PORT,
  dbPassword: process.env.PG_PASSWORD,
  dbUser: process.env.PG_USER,
  dbHost: process.env.PG_HOST,
  dbName: process.env.PG_DATABASE,
};
