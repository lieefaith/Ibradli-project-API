const express = require("express");
const path = require("path");

// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const cors = require("cors");

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
const authRouter = require("./routes/users");
const attendaceRouter = require('./routes/attendance')
const eventRouter = require("./routes/event")
require("dotenv").config();
const app = express();

app.use(cors());

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use("/auth", authRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use('/', attendaceRouter)
app.use('/api', eventRouter)

// app.use("/", indexRouter);
// app.use("/api", usersRouter);
app.listen(process.env.PORT, () => console.log("server running"));

module.exports = app;
