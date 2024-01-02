const mysql = require('mysql2/promise');

// Define the database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'forumdiscussion',
  port: 3307,
};

let connection;

async function handleDisconnect() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection error:', err);
    setTimeout(handleDisconnect, 2000); 
  }

  connection.on('error', async (err) => {
    console.error('Database error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
      await handleDisconnect();
    } else {
      throw err;
    }
  });
}

await handleDisconnect();

// Custom query function that returns a promise
async function query(sql, values) {
  try {
    const [results] = await connection.query(sql, values);
    return results;
  } catch (error) {
    console.error('SQL Error:', error);
    console.error('SQL Query:', sql);
    throw error;
  }
}

// Close connection function
async function close() {
  try {
    await connection.end();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error closing connection:', err);
    throw err;
  }
}

module.exports = { query, close };
