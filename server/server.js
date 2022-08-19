const express = require("express");
const bodyparser = require("body-parser");
// const { createCipheriv } = require("crypto");
// const { runMain } = require("module");
const mongoose = require("mongoose");
// const { userInfo } = require("os");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userroutes");
const adminRouter = require("./routes/adminuserroutes");

const app = express();
app.use(cookieParser());
app.use(express.static("Public"));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(
  cors({
    origin: "*",
  })
);

const url = `mongodb+srv://shanann:shanann123@cluster0.ojhoa.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, () => {
  console.log("Connected ");
});

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.use("/user", userRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("LocalHost 5000 is ready to use!!");
});
