const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
var app = express();
app.use(express.json());
// app.post("/users", function (req, res) {
//   console.log(req.body);
//   res.type("json");
//   res.send('{"message":"Post Successful"}');
// });
// app.get("/", function (req, res) {
//   console.log(req.body);
//   res.type("json");
//   res.send('{"message":"Post Successful"}');
// });

const connectDB = require("./config/db");
// Load Configure
dotenv.config({ path: "./config/config.env" });

connectDB();

app.use("/", require("./routes/index"));
app.listen(3000);
