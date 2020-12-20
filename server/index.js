const express = require("express");
require("./db/mongoose");

const restaurantRouter = require("./routers/restaurant");
const userRouter = require("./routers/user");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(restaurantRouter, userRouter);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
