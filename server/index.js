const express = require("express");
require("./db/mongoose");
const searchPlace = require("./api/places-api");

searchPlace("bagel oasis");
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
