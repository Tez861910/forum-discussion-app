import { Sequelize } from "sequelize";
import { setAssociations } from "./associations.js";
import config from "./config.js";
import * as models from "./models.js";

// Create Sequelize instance
export const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  pool: {
    max: 5, // maximum number of connections in pool
    min: 0, // minimum number of connections in pool
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
  },
});

// Initialize each model with Sequelize
export const initializedModels = Object.fromEntries(
  Object.entries(models).map(([key, model]) => [key, model(sequelize)])
);

// Call setAssociations function to define model associations
setAssociations();

// Authenticate and log database connection status
const maxRetries = 5;
let retryCount = 0;

const authenticateDatabase = async () => {
  while (retryCount < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log("Database connected...");
      break;
    } catch (err) {
      retryCount++;
      console.error(
        `Unable to connect to the database. Attempt ${retryCount} of ${maxRetries} failed:`,
        err
      );
      if (retryCount < maxRetries) {
        console.log(`Retrying in ${retryCount * 2} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryCount * 2000));
      } else {
        console.error(
          "Max retries exceeded. Could not connect to the database."
        );
      }
    }
  }
};

// Call the authentication function
authenticateDatabase();
