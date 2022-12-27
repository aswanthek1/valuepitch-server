const express = require("express");
const app = express();
const logger = require("morgan");
const dotenv = require("dotenv").config();
const http = require("http");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const connectDB = require("./config/db");

app.use(
  cors()
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./routes/userRouter"));

connectDB();
app.use(errorHandler);
server.listen(port, () => console.log(`Server connected port ${port}`));
