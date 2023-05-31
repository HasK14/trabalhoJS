const express = require("express");
const { saveUser, findUserByEmail } = require("../database/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const z = require("zod");
const auth = require("../middlewares/auth");

const router = express.Router();

const UserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().max(70),
  password: z.string().min(6).max(25),
});

router.post("/register", async (req, res) => {
  try {
    const user = UserSchema.parse(req.body);
    const isEmailAlreadyBeingUsed = await findUserByEmail(user.email);
    if (isEmailAlreadyBeingUsed)
      return res.status(400).json({
        message: "email already being used",
      });
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    const savedUser = saveUser(user);
    delete savedUser.password;
    res.json({ user: savedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }
    res.status(500).json({
      message: "server error",
    });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await findUserbyEmail(email);
  if (!user) return res.status(401).json("Email or password not valid");

  const isSamePassword = bcrypt.compareSync(password, user.password);
  if (!isSamePassword)
    return res.status(401).json("Email or password not valid");

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
