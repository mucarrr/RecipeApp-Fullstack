import express from "express";
import { getAllRecipes, createRecipe, getRecipeById, updateRecipe, deleteRecipe } from "../controllers/recipeControllers.js";
import { idControl } from "../util/idControl.js";
import { validCheck, validCheckUpdate } from "../util/validCheck.js";

const router = express.Router();

router.route("/api/v1/recipes")
.get(getAllRecipes)
.post(validCheck, createRecipe)

router.route("/api/v1/recipes/:id")
.get(idControl, getRecipeById)
.patch(idControl, validCheckUpdate, updateRecipe)
.delete(idControl, deleteRecipe)

export default router;