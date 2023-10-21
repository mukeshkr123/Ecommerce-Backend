const express = require("express");
const dbConnect = require("../config/dbConnect");
require("dotenv").config();

const app = express();
//db connection
dbConnect();

module.exports = app;
