import React, { useState } from 'react'
import Search from '../../components/Search'
import { useQuery } from '@tanstack/react-query'
import api from '../../constants/api'
import { useDebounce } from '@uidotdev/usehooks'
import RecipeCard from './RecipeCard'

const Home = () => {
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('')
    const debouncedSearch = useDebounce(search, 1000)

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["recipes", debouncedSearch, order],
        queryFn: () => api.get("/recipes", {params: {
            search: debouncedSearch,
            order: order,
        }}).then((res) => res.data.data),
    })
    console.log(data)

  return (
    <main className="container mx-auto px-4 py-8">
        <Search search={search} setSearch={setSearch} />
        <section className='mt-8'>
            {isLoading && <div className="text-center text-lg">Loading...</div>}
            {isError && <div className="text-center text-red-600">Error loading recipes</div>}
            {data && data.length > 0 && 
            <div className='space-y-6'>
                <h1 className='text-3xl font-bold text-gray-800'>{data.length} recipes found</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
            }
            {data && data.length === 0 && 
            <div className='text-center space-y-4'>
                <h1 className='text-3xl font-bold text-gray-800'>No recipes found</h1>
                <p className='text-gray-500 text-lg'>Try searching for a different recipe</p>
            </div>
            }
        </section>
    </main>
  )
}

export default Home