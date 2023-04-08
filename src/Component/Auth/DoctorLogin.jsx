import React from 'react'

function DoctorLogin() {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-white overflow-hidden'>
            <div className='flex md:flex-row flex-col '>
                <div className='w-auto'>
                    <img className='w-80 h-96' src="https://i.pinimg.com/564x/16/20/29/162029f2471a6bfdc34cae1b491154bd.jpg" alt="" />
                </div>
                <div className='w-80 h-96   bg-blue-400 '  >
                    <h1 className="mt-5 text-2xl font-semibold text-center text-gray-700">
                       BABY CARE LOGIN
                    </h1>
                    <form className="mt-6">
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Name
                            </label>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                       
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
  )
}

export default DoctorLogin