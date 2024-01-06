import mysql from "mysql2/promise";

// Define the MySQL database connection configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "universitysystem",
  port: 3307,
};

let connection;

export const handleDisconnect = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the MySQL database");
  } catch (err) {
    console.error("MySQL Database connection error:", err);
    setTimeout(handleDisconnect, 2000);
  }

  connection.on("error", async (err) => {
    console.error("MySQL Database error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      await handleDisconnect();
    } else {
      throw err;
    }
  });
};

// Custom MySQL query function that returns a promise
export const query = async (sql, values) => {
  try {
    const [results] = await connection.query(sql, values);
    return results;
  } catch (error) {
    console.error("MySQL SQL Error:", error);
    console.error("MySQL SQL Query:", sql);
    throw error;
  }
};

// Close MySQL connection function
export const close = async () => {
  try {
    await connection.end();
    console.log("MySQL Database connection closed");
  } catch (err) {
    console.error("Error closing MySQL connection:", err);
    throw err;
  }
};

// Immediately Invoked Function Expression (IIFE) to handle disconnect
(async () => {
  try {
    await handleDisconnect();
  } catch (err) {
    console.error(err);
  }
})();
