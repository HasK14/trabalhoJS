const prisma = require("./prisma");

const saveUser = (user) => {
  return prisma.users.create({
    data: user,
  });
};

const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

module.exports = {
  saveUser,
  findUserByEmail,
};
