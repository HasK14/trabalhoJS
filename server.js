const express = require("express");
const healthRoutes = require("./routes/health");

const app = express();
app.use(express.json());

app.use(healthRoutes.router);

module.exports = { app };
