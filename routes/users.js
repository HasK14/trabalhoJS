const express = require("express");
const router = express.Router();

const z = require("zod");
const { saveUser } = require("../database/users");

const userSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().max(70),
  password: z.string().min(6).max(25),
});

router.post("/register", async (req, res, next) => {
  const user = userSchema.parse(req.body);
  const savedUser = await saveUser(user);
  res.status(201).json({
    user: savedUser,
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
});

module.exports = {
  router,
};
