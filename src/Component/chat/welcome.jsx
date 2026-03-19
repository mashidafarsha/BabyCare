import React from 'react'
import Robot from '../../assets/robot welcome.gif'

function welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12">
      <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
        <img className="h-28 object-contain" src={Robot} alt="Welcome" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Patient Support Chat</h2>
      <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">Select a specialist from the directory to start a secure consultation.</p>
    </div>
  )
}

export default welcome