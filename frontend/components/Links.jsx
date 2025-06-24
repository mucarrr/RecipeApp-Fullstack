import { FaHome, FaPlus, FaEdit, FaBook, FaRegCompass, FaRegHeart } from 'react-icons/fa'
import { MdHelpOutline } from 'react-icons/md'
export const Links = [
    {icon : <FaHome />, path : '/', name : 'Home'},
    {icon : <FaPlus />, path : '/create', name : 'Create'},
    {icon : <FaBook />, path : '/instructions/:id', name : 'Instructions'},
    {icon : <FaRegCompass />, path : '/#', name : 'Explore'},
    {icon: <FaRegHeart />, path : '/#', name : 'Favorites'},
    {icon: <MdHelpOutline />, path : '/#', name : 'Help'},
]