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

export const validCheckUpdate = (req, res, next) => {
    const updateData = req.body;
    const requestFields = ["recipeName", "category", "ingredients", "instructions", "recipeTime", "servingSuggestions", "image"];
    
    // Check if at least one field is provided
    const hasValidField = requestFields.some((field) => updateData.hasOwnProperty(field));
    
    if (!hasValidField) {
        return res.status(400).json({
            status: "error",
            message: "At least one field must be provided for update",
        });
    }
    
    // Check if provided fields are not empty (for required fields)
    const requiredFields = ["recipeName", "category", "ingredients", "instructions", "recipeTime"];
    const hasEmptyRequiredField = requiredFields.some((field) => 
        updateData.hasOwnProperty(field) && 
        (!updateData[field] || 
         (Array.isArray(updateData[field]) && updateData[field].length === 0))
    );
    
    if (hasEmptyRequiredField) {
        return res.status(400).json({
            status: "error",
            message: "Required fields cannot be empty",
        });
    }
    
    next();
}