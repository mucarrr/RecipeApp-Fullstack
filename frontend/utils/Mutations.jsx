import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../constants/api'

export const useRecipeData = (id, mode) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => api.get(`/recipes/${id}`).then(res => res.data.data),
    enabled: mode === 'edit' && !!id,
  })
}

export const useCreateRecipe = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => api.post('/recipes', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate('/')
    },
    onError: (error) => {
      console.error('Error creating recipe:', error)
      alert('Error creating recipe. Please try again.')
    }
  })
}
export const useUpdateRecipe = (id) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => api.patch(`/recipes/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      queryClient.invalidateQueries({ queryKey: ['recipe', id] })
      navigate('/')
    },
    onError: (error) => {
      console.error('Error updating recipe:', error)
      alert('Error updating recipe. Please try again.')
    }
  })
}