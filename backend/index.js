const express = require("express");
const env = require("dotenv").config();
const bodyparser = require("body-parser");
const dbConfig = require("./config/dbConfig");
const cors = require("cors");
const app = express();
const bmi = require("./routes/bmirouter");

app.use(bodyparser.json());

app.use(cors());
app.use("/bmi", bmi);

const PORT = 3001;

app.listen(PORT, console.log(`server listing to the port ${PORT}`));
