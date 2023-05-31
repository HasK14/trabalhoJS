const express = require("express");
const healthRoutes = require("./routes/health");
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const EmailAlreadyBeenUsed = require("./errors/EmailAlreadyBeingUsed");
const { ZodError } = require("zod");
const { logger } = require("./middlewares/logger");

const app = express();
app.use(express.json());

app.use(logger);

app.use(healthRoutes.router);
app.use(userRoutes.router);
app.use(recipeRoutes.router);

app.use((err, req, res, next) => {
  if (err instanceof EmailAlreadyBeenUsed) {
    return res.status(400).json({
      message: err.message,
    });
  }
  if (err instanceof ZodError)
    return res.status(422).json({
      message: err.errors,
    });
  res.status(500).json({ message: "Server Error " });
});

module.exports = { app };
