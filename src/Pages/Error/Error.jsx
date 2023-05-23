import React from 'react'
import { useNavigate } from 'react-router-dom';
function Error() {
    const navigate=useNavigate()
  return (
    <>
    <div className="text-white text-center bg-gradient-to-r from-orange-300 to-sky-300 h-[100vh] flex justify-center ">
      <div className="m-56">
       
        <h1 className="p-2 font-mono font-extrabold text-center text-zinc-700 text-7xl">OOPs...:404 error</h1>
        <h1 className="p-2 font-mono text-5xl font-extrabold text-center text-zinc-700">Something Went Wrong</h1>
        <button
          className="p-2 text-white rounded-lg bg-lime-700 hover:bg-lime-900"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </div>  
  </>
  )
}

export default Error