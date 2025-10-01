import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true" || false,
    backendUrl:
      process.env.NODE_ENV === "production"
        ? process.env.MEDUSA_BACKEND_URL
        : "http://localhost:9000",
  },

  projectConfig: {
    redisUrl: process.env.REDIS_URL,
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
});
