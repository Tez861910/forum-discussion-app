const mysql = require('mysql');

// Define the database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'forumdiscussion',
  port: 3307,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});
                                                      
// Custom query function that returns a promise
function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('SQL Error:', error);
        console.error('SQL Query:', sql); 
        reject(error);
      } else {
        if (Array.isArray(results)) {
          resolve(results);
        } else {
          resolve([results]);
        }
      }
    });
  });
}


module.exports = { query };
