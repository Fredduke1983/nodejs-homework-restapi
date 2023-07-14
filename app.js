const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { contactsRouter } = require("./routes/api/");
const { userRouter } = require("./routes/api/");
const { errMessage } = require("./constants/errors");

console.log("=========================");

dotenv.config({ path: "./.env" });

const app = express();

const formatsLogger = process.env.ENV_DEV === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: errMessage.errNotFound });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = app;
