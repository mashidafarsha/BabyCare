import React from 'react'
import Robot from '../../assets/robot welcome.gif'
function welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10 animate-pulse">
    <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center mb-6">
      <img className="h-32 object-contain" src={Robot} alt="Welcome" />
    </div>
    <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">TrueCare Chat</h2>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Select a doctor to start your consultation</p>
  </div>
  )
}

export default welcome