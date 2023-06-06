const prisma = require("./prisma");

const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return recipes;
};

const getRecipeById = (id) => {
  return prisma.recipe.findFirst({
    where: {
      id: id,
    },
  });
};

const findRecipeByID = (id) => {
  return prisma.recipe.findUnique({
    where: { id },
  });
};

const saveRecipe = async (recipe, userId) => {
  return prisma.recipe.create({
    data: {
      name: recipe.name,
      description: recipe.description,
      preparationTime: recipe.preparationTime,
      userId: userId,
    },
    include: {
      user: true,
    },
  });
};

const updateRecipe = (id, recipe) => {
  return prisma.recipe.update({
    where: {
      id: id,
    },
    data: recipe,
  });
};

const deleteRecipe = (id) => {
  return prisma.recipe.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  findRecipeByID,
  saveRecipe,
};
