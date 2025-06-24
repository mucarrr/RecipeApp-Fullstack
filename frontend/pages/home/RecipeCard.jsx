import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({recipe}) => {
  return (
    <Link to={`/instructions/${recipe.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
            src={recipe.image} 
            alt={recipe.recipeName} 
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.recipeName}</h3>
            <p className="text-sm text-blue-600 font-medium mb-2">{recipe.category}</p>
            <p className="text-sm text-gray-600 mb-3">⏱️ {recipe.recipeTime}</p>
            
            <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Ingredients:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {ingredient}
                        </li>
                    ))}
                    {recipe.ingredients.length > 3 && (
                        <li className="text-blue-600 text-xs">+{recipe.ingredients.length - 3} more ingredients</li>
                    )}
                </ul>
            </div>

            <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Instructions:</h4>
                <p className="text-xs text-gray-600 line-clamp-2">
                    {recipe.instructions.slice(0, 2).join('. ')}
                    {recipe.instructions.length > 2 && '...'}
                </p>
            </div>

            {recipe.servingSuggestions && (
                <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 italic">
                        💡 {recipe.servingSuggestions}
                    </p>
                </div>
            )}
        </div>
    </Link>
  )
}

export default RecipeCard