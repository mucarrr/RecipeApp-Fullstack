import fs from "fs";

export const readRecipes = () => {
  try {
    const recipes = JSON.parse(fs.readFileSync("./data/recipes.json", "utf-8"));
    return recipes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const writeRecipes = (recipes) => {
  try {
    fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes, null, 2));
  } catch (error) {
    throw error;
  }
}