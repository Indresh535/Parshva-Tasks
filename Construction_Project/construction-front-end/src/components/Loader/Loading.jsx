import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-4 text-center">
        <div className="animate-bounce mb-2 text-3xl">
            <div className="h-10 w-10 border-t-4 border-blue-500 rounded-full animate-spin">  
                <CircularProgress /> 
                <p>Loading... </p>    
            </div>
        </div>        
      </div>
    </div>
  )
}

export default Loader
