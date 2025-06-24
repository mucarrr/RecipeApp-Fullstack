import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { IoArrowBack } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import api from '../../constants/api'
import DeleteRecipeButton from '../../components/DeleteRecipeButton'

const Instructions = () => {
    const {id} = useParams()

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => api.get(`/recipes/${id}`).then((res) => res.data.data),
    })

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-lg">Loading recipe details...</div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-600">Error loading recipe details</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <div className="flex justify-between items-center mb-6">
                <Link 
                    to="/" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <IoArrowBack className="w-4 h-4 mr-2" />
                    Back to Recipes
                </Link>
                
                <div className="flex gap-3">
                    <Link 
                        to={`/edit/${data.id}`}
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FiEdit className="w-4 h-4 mr-2" />
                        Edit Recipe
                    </Link>
                    
                    <DeleteRecipeButton recipeId={data.id} refetch={refetch}    />
                </div>
            </div>

            {/* Recipe Header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img 
                            src={data.image} 
                            alt={data.recipeName} 
                            className="w-full h-80 md:h-80 object-cover bg-gray-100 rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.recipeName}</h1>
                        <p className="text-lg text-green-600 font-medium mb-4">{data.category}</p>
                        <p className="text-gray-600 mb-4">⏱️ {data.recipeTime}</p>
                        
                        {data.servingSuggestions && (
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-gray-700">
                                    💡 <span className="font-medium">Serving Suggestion:</span> {data.servingSuggestions}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ingredients Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {data.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            <span className="text-gray-700">{ingredient}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
                <div className="space-y-6">
                    {data.instructions.map((instruction, index) => (
                        <div key={index} className="flex">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-700 leading-relaxed">{instruction}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Instructions