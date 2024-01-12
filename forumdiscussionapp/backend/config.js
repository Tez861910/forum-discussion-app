import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  ARGON2_TIME_COST: process.env.ARGON2_TIME_COST,
  ARGON2_MEMORY_COST: process.env.ARGON2_MEMORY_COST,
  ARGON2_PARALLELISM: process.env.ARGON2_PARALLELISM,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
};
