const prisma = require("./prisma");

const saveUser = (user) => {
  return prisma.users.create({
    data: user,
  });
};

const findUserbyEmail = (email) => {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
};

module.exports = {
  saveUser,
  findUserbyEmail,
};
