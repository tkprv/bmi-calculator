const db = require("../config/dbConfig");
const request = require("request");

const adddata = (req, res) => {
  const height = req.body.height;
  const weight = req.body.weight;
  const bmi = req.body.bmi;
  const value = req.body.databmi;
  db.query("INSERT INTO bmi (height, weight, bmi, databmi) VALUES (?, ?, ?, ?)",
    [height, weight, bmi, value],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('height', height)
  console.log('weight', weight)
};

const showdata = (req, res) => {
  db.query(
    "SELECT * FROM bmi ORDER BY id DESC limit 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row);
        });
      }
    }
  );
};

module.exports = { adddata, showdata };
