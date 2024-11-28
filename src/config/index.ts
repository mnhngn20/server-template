export const APP_CONFIG = {
  devPort: 3000,
  dbPort: process.env.DB_PORT ?? 5432,
  dbName: process.env.DB_NAME ?? "postgresql",
  dbPassword: process.env.DB_PASSWORD ?? "password",
};
