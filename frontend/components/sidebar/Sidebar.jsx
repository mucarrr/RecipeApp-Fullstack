import React from 'react'
import { NavLink } from 'react-router-dom'
import { Links } from '../Links'

const Sidebar = () => {
  return (
    <aside className='h-screen flex flex-col justify-between items-center md:px-3 py-3 max-md:gap-20 max-md:justify-normal'>
        <img src="/r_logo.jpg" alt="logo" className='max-w-[80px] md:max-w-[150px] mx-auto' />
    <nav className='flex flex-col gap-20'>
        {Links.map((link, index) => (
            <NavLink to={link.path} key={index} className='flex items-center gap-2 text-lg text-gray-500'>
                <span className='max-md:text-2xl'>{link.icon}</span>
                <span className='hidden md:block'>{link.name}</span>
            </NavLink>
        ))}
    </nav>
    <div className='flex flex-col gap-2 max-md:hidden mt-5'>
        <p className='text-gray-500 text-sm font-semibold'>Follow daily news</p>
       <button className='bg-red-500 rounded-lg text-white px-4 py-2 hover:bg-red-600 transition-all duration-300'>Subscribe</button>
    </div>
    </aside>
  )
}

export default Sidebar