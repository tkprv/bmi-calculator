const mysql = require('mysql');
const env = require('dotenv').config()

const dbConfig = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  port: "3307",
  database: "bmi",
});


dbConfig.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database = ', err)
    return;
  }
  console.log('MySQL successfully connected!');
})

module.exports = dbConfig