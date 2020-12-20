const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("./db/mongoose");

const restaurantRouter = require("./routers/restaurant");
const userRouter = require("./routers/user");

const port = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(restaurantRouter, userRouter);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
