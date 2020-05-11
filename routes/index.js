const express = require("express");
const app = express();

app.use("/contributors", require("./contributors"));
app.use("/admins", require("./admins"));
app.use("/global", require("./global"));
app.use("/tasks", require("./tasks"));
app.use("/models", require("./models"));
app.use("/datasets", require("./datasets"));

module.exports = app;
