import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from '../pages/home/Home'
import Instructions from '../pages/instructions/Instructions'
import Create from '../pages/create/Create'
import Update from '../pages/edit/Edit'
import NotFound from '../components/NotFound'
import Sidebar from '../components/sidebar/Sidebar'

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-5">
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/instructions/:id' element={<Instructions />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Update />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  )
}

export default App