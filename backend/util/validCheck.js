export const validCheck = (req, res, next) => {
    const newRecipe = req.body;
    const requestFields = ["recipeName", "category", "ingredients", "instructions", "recipeTime", "servingSuggestions", "image"];
    const isInvalid = requestFields.some((field) => !newRecipe[field]);
    
    if (isInvalid) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields",
        });
    }
    
    next();
}