const express = require("express");
const healthRoutes = require("./routes/health");
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");

const app = express();
app.use(express.json());

app.use(healthRoutes.router);
app.use(userRoutes.router);
app.use(recipeRoutes.router);

module.exports = { app };
