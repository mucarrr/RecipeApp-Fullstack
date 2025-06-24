import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import crypto from "crypto";

export const getAllRecipes = (req, res) => {
  try {
    const recipes = readRecipes();
    const { search, order } = req.query; 

    let filteredRecipes = recipes;
    if (search) {
      filteredRecipes = recipes.filter(recipe => {
        const recipeString = JSON.stringify(recipe).toLowerCase();
        return recipeString.includes(search.toLowerCase());
      });
    }
    if(order){
      filteredRecipes = filteredRecipes.sort((a, b) => {
        const timeA = parseInt(a.recipeTime);
        const timeB = parseInt(b.recipeTime);
        return order === "asc" ? timeA - timeB : timeB - timeA;
      });
    }
    if (!filteredRecipes || filteredRecipes.length === 0) {
      return res.status(404).json({
        status: "error",
        message: search ? "No recipes found matching your search" : "No recipes found",
      });
    }

    if (filteredRecipes.length > 0) {
      return res.status(200).json({
        status: "success",
        message: search ? "Search results retrieved successfully" : "All recipes retrieved successfully",
        total: filteredRecipes.length,
        data: filteredRecipes,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve recipes",
      error: error.message,
    });
  }
}

export const createRecipe = (req, res) => {
    try {
        let newRecipe = req.body;
        const recipes = readRecipes();
        const newRecipeId = crypto.randomUUID();
        newRecipe = { id: newRecipeId, ...newRecipe };
        recipes.push(newRecipe);
        writeRecipes(recipes);
        res.status(201).json({      
            status: "success",
            message: "Recipe created successfully",
            data: newRecipe,
        });
    } catch(error) {
        res.status(500).json({
            status: "error",
            message: "Failed to create recipe",
            error: error.message,
        });
    }
}
export const getRecipeById = (req, res) => {
  try{
    res.status(200).json({
      status: "success",
      message: "Recipe retrieved successfully",
      data: req.recipe,
    });
  }catch(error){
    res.status(500).json({
      status: "error",
      message: "Failed to get recipe by id",
      error: error.message,
    });
  }
}
export const updateRecipe = (req, res) => {
  try{
    const recipeIndex = req.recipes.findIndex(recipe => String(recipe.id) === req.recipe.id);
    const updatedRecipe = { ...req.recipe, ...req.body };
    req.recipes[recipeIndex] = updatedRecipe;
    writeRecipes(req.recipes);
    res.status(200).json({
      status: "success",
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  }catch(error){
    res.status(500).json({
      status: "error",
      message: "Failed to update recipe",
      error: error.message,
    });
  }
}
export const deleteRecipe = (req, res) => {
  try{
    const updatedRecipes = req.recipes.filter(recipe => String(recipe.id) !== String(req.recipe.id));
    writeRecipes(updatedRecipes);
    res.status(200).json({
      status: "success",
      message: "Recipe deleted successfully",
      data: req.recipe,
    });
  }catch(error){
    res.status(500).json({
      status: "error",
      message: "Failed to delete recipe",
      error: error.message,
    });
  }
}