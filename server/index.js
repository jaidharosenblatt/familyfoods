const express = require("express");
require("./db/mongoose");

const restaurantRouter = require("./routers/restaurant");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(restaurantRouter);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
