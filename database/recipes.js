const { pid } = require("process");
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

const findRecipeByID = (id) => {
  return prisma.recipes.findUnique({
    where: { id },
  });
};

const saveRecipe = (recipe) => {
  return prisma.recipes.create({
    data: recipe,
  });
};

const updateRecipe = (id, recipe) => {
  return prisma.recipes.update({
    where: {
      id: id,
    },
    data: recipe,
  });
};

const deleteRecipe = (id) => {
  return prisma.recipes.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
  findRecipeByID,
};
