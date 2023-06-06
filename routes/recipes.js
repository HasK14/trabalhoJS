const express = require("express");
const router = express.Router();
const z = require("zod");
const {
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  findRecipeByID,
  saveRecipe,
} = require("../database/recipes");
const auth = require("../middlewares/auth");
const { recipe } = require("../database/prisma");

const RecipeSchema = z.object({
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

router.post("/recipe", auth, async (req, res) => {
  try {
    const newRecipe = RecipeSchema.parse(req.body);
    const userId = req.userId;
    const savedRecipe = await saveRecipe(newRecipe, userId);
    delete savedRecipe.user.password;
    res.status(201).json({
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error(error);
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

router.put("/recipes/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const recipe = RecipeSchema.parse(req.body);
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

module.exports = router;
