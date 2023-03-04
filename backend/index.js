const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
const cors = require("cors");
require("./model/index");
app.use(cors());
mongoose.set("strictQuery", true);
const port = process.env.port || 4001;

const db = require("./model/index");
db.connectDB();
const Router = require("./routes/index");

app.use("/api", Router);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});
