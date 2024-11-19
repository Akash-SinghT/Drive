const express = require("express");
const userRouter = require("./routes/user.routes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
app.use(cookieParser);
const connectToDb = require("./config/db");
connectToDb();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
