import React from 'react'
import { Link } from 'react-router-dom'
import { IoHome, IoArrowBack } from 'react-icons/io5'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-4">
          <Link 
            to="/"
            className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <IoHome className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <IoArrowBack className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">
            Need help? Check out our recipe collection or try searching for what you're looking for.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound