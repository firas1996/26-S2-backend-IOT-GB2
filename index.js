const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connection to the DB secured !!!!");
  })
  .catch((e) => {
    console.log("Error: " + e);
  });

const app = express();

const port = 1212;

app.listen(port, () => {
  console.log("The server is running on port: " + port);
});
