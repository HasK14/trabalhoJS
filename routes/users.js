const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const z = require("zod");
const { saveUser, findUserbyEmail } = require("../database/users");

const userSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().max(70),
  password: z.string().min(6).max(25),
});

router.post("/register", async (req, res, next) => {
  const user = userSchema.parse(req.body);
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  user.password = hashedPassword;
  const savedUser = await saveUser(user);
  delete savedUser.password;
  res.status(201).json({
    user: savedUser,
  });
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await findUserbyEmail(email);
  if (!user) return res.status(401).json("Email ou senha inválidas");

  const isSamePassword = bcrypt.compareSync(password, user.password);
  if (!isSamePassword) return res.status(401).json("Email ou senha inválidos");

  const token = jwt.sign(
    {
      userID: user.id,
      name: user.name,
    },
    process.env.SECRET
  );
  res.json({
    succes: true,
    token,
  });
});

module.exports = {
  router,
};
