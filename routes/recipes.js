const express = require("express");
const router = express.Router();
const z = require("zod");
const {
  getAllRecipes,
  getRecipeById,
  saveRecipe,
} = require("../database/recipes");

const recipeSchema = z.object({
  name: z.string(),
  description: z.string().min(10),
  preparationTime: z.string(),
});

router.get("/recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json({
    recipes,
  });
});

router.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const recipe = await getRecipeById(id);
  res.json({
    product,
  });
});

router.post("/postRecipe", async (req, res) => {
  const newRecipe = recipeSchema.parse(req.body);
  const savedRecipe = await saveRecipe(newRecipe);
  res.json({
    recipe: savedRecipe,
  });
});

module.exports = {
  router,
};
