const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'forumdiscussion',
});

// Use the pool for database queries
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, values, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Database query error:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
};

module.exports = { query };
