const express = require("express");
const dbConnect = require("../config/dbConnect");
const v1ApiRoutes = require("../routes");
require("dotenv").config();
const cors = require("cors");

const app = express();
//db connection
dbConnect();

//cors
app.use(cors());

//pass incoming data
app.use(express.json());
//url encoded
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", v1ApiRoutes);

module.exports = app;
