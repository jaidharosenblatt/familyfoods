const express = require("express");
require("./db/mongoose");
const searchPlace = require("./api/places");
const { findDistance } = require("./api/distance");

const getDistance = async () => {
  const { candidates } = await searchPlace("bagel oasis");
  const { location } = candidates[0].geometry;
  const dist = await findDistance(null, location);
  console.log(dist);
};
getDistance();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
