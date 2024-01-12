import mysql from "mysql2/promise";
import config from "./config.js";

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const query = async (sql, values) => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    console.error("MySQL SQL Error:", error);
    console.error("MySQL SQL Query:", sql);
    throw error;
  } finally {
    connection.release();
  }
};
