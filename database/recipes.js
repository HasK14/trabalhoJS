const prisma = require("./prisma");

const getAllRecipes = () => {
  return prisma.recipes.findMany();
};

const getRecipeById = (id) => {
  return prisma.recipes.findFirst({
    where: {
      id: id,
    },
  });
};

const saveRecipe = (recipe) => {
  return prisma.recipes.create({
    data: recipe,
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  saveRecipe,
};
