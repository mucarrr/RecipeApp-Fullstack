import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = ({search, setSearch}) => {
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(search)
  }
  return (
    <section className='flex items-center gap-2 bg-white p-3 rounded-lg md:w-2/5'>
        <BiSearch />
        <input type="text" placeholder='Search for a recipe' className='outline-none' value={search} onChange={(e) => setSearch(e.target.value)} />
    </section>
  )
}

export default Search