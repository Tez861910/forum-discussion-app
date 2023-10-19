const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "forumdiscussion"
})
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (UserID,UserName,UserEmail,UserPassword) VALUES (?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.email,
        req.body.password]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/login', [
    check('UserEmail', "email length error").isEmail().isLength({ min: 10, max: 30 }),
    check('UserPassword', "password length 8-10").isLength({ min: 8, max: 10 })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(err);
      return res.json(errors);
    } else {
      const sql = "SELECT * FROM users WHERE 'UserEmail' = ? AND 'UserPassword' = ?";
      db.query(sql, [req.body.UserEmail, req.body.UserPassword], (err, data) => {
        if (err) {
          console.log(err);
          return res.json("Error");
        }
        if (data.length > 0) {
          return res.json("Success");
        } else {
          console.log(err);
          return res.json("Fail");
        }
      });
    }
  });
app.listen(8081, () => {
    console.log("listening");
})