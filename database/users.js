const prisma = require("./prisma");

const saveUser = (user) => {
  return prisma.users.create({
    data: user,
  });
};

module.exports = {
  saveUser,
};
