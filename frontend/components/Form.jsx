import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecipeData, useCreateRecipe, useUpdateRecipe } from '../utils/Mutations'

const Form = ({ mode = 'create', initialData = null }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    recipeName: '',
    category: '',
    ingredients: [''],
    instructions: [''],
    recipeTime: '',
    servingSuggestions: '',
    image: ''
  })

  const categories = [
    'Italian', 'Indian', 'Mexican', 'Thai', 'Mediterranean', 
    'American', 'Chinese', 'Japanese', 'French', 'Greek',
    'Salad', 'Dessert', 'Breakfast', 'Lunch', 'Dinner', 'Snack'
  ]

  const { data: recipeData, isLoading: isLoadingRecipe, error: recipeError } = useRecipeData(id, mode)
  const createRecipeMutation = useCreateRecipe()
  const updateRecipeMutation = useUpdateRecipe(id)

  useEffect(() => {
    if (mode === 'edit' && recipeData) {
      setFormData({
        recipeName: recipeData.recipeName || '',
        category: recipeData.category || '',
        ingredients: recipeData.ingredients && recipeData.ingredients.length > 0 ? recipeData.ingredients : [''],
        instructions: recipeData.instructions && recipeData.instructions.length > 0 ? recipeData.instructions : [''],
        recipeTime: recipeData.recipeTime || '',
        servingSuggestions: recipeData.servingSuggestions || '',
        image: recipeData.image || ''
      })
    }
  }, [mode, recipeData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Filter out empty ingredients and instructions
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(ingredient => ingredient.trim() !== ''),
      instructions: formData.instructions.filter(instruction => instruction.trim() !== '')
    }

    if (mode === 'edit' && id) {
      updateRecipeMutation.mutate(cleanedData)
    } else {
      createRecipeMutation.mutate(cleanedData)
    }
  }

  const isEditMode = mode === 'edit'
  const pageTitle = isEditMode ? 'Edit Recipe' : 'Create New Recipe'
  const pageDescription = isEditMode ? 'Update your recipe details' : 'Share your delicious recipe with the community!'
  const submitButtonText = isEditMode ? 'Update Recipe' : 'Create Recipe'
  const loadingText = isEditMode ? 'Updating Recipe...' : 'Creating Recipe...'

  // Show loading state while fetching recipe data
  if (isEditMode && isLoadingRecipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading recipe data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if recipe fetch fails
  if (isEditMode && recipeError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading recipe data</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{pageTitle}</h1>
            <p className="text-gray-600">{pageDescription}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Name *
              </label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={formData.recipeName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter recipe name"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="recipeTime" className="block text-sm font-medium text-gray-700 mb-2">
                Cooking Time *
              </label>
              <input
                type="text"
                id="recipeTime"
                name="recipeTime"
                value={formData.recipeTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 30 minutes, 1 hour 15 minutes"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/recipe-image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients *
              </label>
              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'ingredients')}
                        className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('ingredients')}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  + Add Ingredient
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions *
              </label>
              <div className="space-y-3">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-600">Step {index + 1}</span>
                      </div>
                      <textarea
                        value={instruction}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Describe step ${index + 1}`}
                      />
                    </div>
                    {formData.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'instructions')}
                        className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors self-start mt-8"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('instructions')}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  + Add Step
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="servingSuggestions" className="block text-sm font-medium text-gray-700 mb-2">
                Serving Suggestions
              </label>
              <textarea
                id="servingSuggestions"
                name="servingSuggestions"
                value={formData.servingSuggestions}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Serve with a crisp green salad and a glass of white wine"
              />
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={createRecipeMutation.isPending || updateRecipeMutation.isPending}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {createRecipeMutation.isPending || updateRecipeMutation.isPending ? loadingText : submitButtonText}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form