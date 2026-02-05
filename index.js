const express = require("express");

const app = express();

const port = 1212;

app.listen(port, () => {
  console.log("The server is running on port: " + port);
});
