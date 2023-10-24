var express = require("express");
var cors = require("cors");
var app = express();
require('dotenv').config()

app.use(cors());

const mysql = require("mysql2");
// create the connection database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/helloworld", (req, res) => {
  return res.json({ msg: "Hello world" });
});

app.get("/attractions", (req, res) => {
  const sql = "SELECT * FROM attractions";
  connection.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Errer in running query" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.listen(3001, () => {
  console.log("Web server listening on port 3001");
});
