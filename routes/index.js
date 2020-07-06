const express = require("express");
const app = express();

app.use("/documents", require("./documents"));
app.use("/users", require("./users"));

module.exports = app;
