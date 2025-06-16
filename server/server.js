const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const connectDB = require("./config/db"); // ✅ load the function
require('dotenv').config(); // ✅ load .env

const cors = require("cors");

const app = express();

// ✅ CONNECT TO DB
connectDB();  // ✅ call it

app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

app.listen(5001, () => console.log("app started at 5001..."));
