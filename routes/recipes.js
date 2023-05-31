const express = require("express");
const router = express.Router();
const z = require("zod");
const {
  getAllRecipes,
  getRecipeById,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
  findRecipeByID,
} = require("../database/recipes");
const auth = require("../middlewares/auth");

const recipeSchema = z.object({
  name: z.string(),
  description: z.string().min(10),
  preparationTime: z.string(),
});

router.get("/recipes", auth, async (req, res) => {
  const recipes = await getAllRecipes();
  res.json({
    recipes,
  });
});

router.get("/recipes/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const recipe = await getRecipeById(id);
  res.json({
    recipe,
  });
});

router.post("/postRecipe", auth, async (req, res, next) => {
  try {
    const newRecipe = recipeSchema.parse(req.body);
    const savedRecipe = await saveRecipe(newRecipe);
    res.json({
      recipe: savedRecipe,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/recipes/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const recipe = recipeSchema.parse(req.body);
  const updatedRecipe = await updateRecipe(id, recipe);
  res.json({
    recipe: updatedRecipe,
  });
});

router.delete("/recipes/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const recipe = await findRecipeByID(id);
  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found",
    });
  }
  await deleteRecipe(id);
  res.status(200).json({ message: "Recipe deleted" });
});

module.exports = {
  router,
};
