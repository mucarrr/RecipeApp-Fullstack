import { readRecipes } from "../model/recipeModel.js";

export const idControl = (req, res, next) => {
    const { id } = req.params;
    const recipes = readRecipes();
    const recipe = recipes.find(recipe => String(recipe.id) === id);
    
    if (!recipe) {
      return res.status(404).json({
        status: "error",
        message: "Recipe not found",
      });
    }
    
    // Recipe'yi request objesine ekle ki controller'larda kullanabilelim
    req.recipe = recipe;
    req.recipes = recipes;
    
    next();
}