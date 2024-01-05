import mysql from "mysql2/promise";
// import mssql from 'mssql'; // Commented out for now

// Define the MySQL database connection configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "universitysystem",
  port: 3307,
};

// Define the MSSQL database connection configuration
// const mssqlConfig = {
//   server: 'TLAP\\SQLEXPRESS',
//   options: {
//     trustedConnection: true
//   }
// };

let connection;
// let mssqlConnection;

async function handleDisconnect() {
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
}

// async function handleMssqlDisconnect() {
//   try {
//     mssqlConnection = await mssql.connect(mssqlConfig);
//     console.log('Connected to the MSSQL database');
//   } catch (err) {
//     console.error('MSSQL Database connection error:', err);
//     setTimeout(handleMssqlDisconnect, 2000);
//   }

//   mssqlConnection.on('error', async (err) => {
//     console.error('MSSQL Database error', err);
//     if (err.code === 'ETIMEOUT') {
//       await handleMssqlDisconnect();
//     } else {
//       throw err;
//     }
//   });
// }

// Custom MySQL query function that returns a promise
async function query(sql, values) {
  try {
    const [results] = await connection.query(sql, values);
    return results;
  } catch (error) {
    console.error("MySQL SQL Error:", error);
    console.error("MySQL SQL Query:", sql);
    throw error;
  }
}

// // Custom MSSQL query function that returns a promise
// async function mssqlQuery(sql, values) {
//   try {
//     const request = new mssql.Request(mssqlConnection);
//     const results = await request.query(sql);
//     return results.recordset;
//   } catch (error) {
//     console.error('MSSQL SQL Error:', error);
//     console.error('MSSQL SQL Query:', sql);
//     throw error;
//   }
// }

// // Close MySQL connection function
async function close() {
  try {
    await connection.end();
    console.log("MySQL Database connection closed");
  } catch (err) {
    console.error("Error closing MySQL connection:", err);
    throw err;
  }
}

// // Close MSSQL connection function
// async function mssqlClose() {
//   try {
//     await mssqlConnection.close();
//     console.log('MSSQL Database connection closed');
//   } catch (err) {
//     console.error('Error closing MSSQL connection:', err);
//     throw err;
//   }
// }

export { query, close }; // Removed mssqlQuery and mssqlClose

// Immediately Invoked Function Expression (IIFE) to handle disconnect
(async () => {
  try {
    await handleDisconnect();
    // await handleMssqlDisconnect(); // Commented out for now
  } catch (err) {
    console.error(err);
  }
})();
