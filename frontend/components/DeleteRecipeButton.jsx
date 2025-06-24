import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useMutation } from '@tanstack/react-query'
import api from '../constants/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DeleteRecipeButton = ({ recipeId, refetch }) => {
    const navigate = useNavigate()
    
    const {mutate, isPending, error} = useMutation({
        mutationFn: () => api.delete(`/recipes/${recipeId}`),
        onSuccess: (data) => {
            toast.success('Recipe deleted successfully!')
            navigate('/')
        },
        onError: (error) => {
            toast.error('Failed to delete recipe: ' + (error?.response?.data?.message || error.message))
        }
    })

    return (
        <button
            onClick={() => {
                if (window.confirm('Are you sure you want to delete this recipe?')) {
                    mutate()
                }
            }}
            disabled={isPending}
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
            <FiTrash2 className="w-4 h-4 mr-2" />
            {isPending ? 'Deleting...' : 'Delete Recipe'}   
        </button>
    )
}

export default DeleteRecipeButton