import React from 'react'

function Search({ value, onChange, placeholder = "Search for diseases, doctors, or specialities..." }) {
  return (
    // Navbar fixed aayathukondu thottu thazhe ulla component-u padding-top (pt-24) venam
    <div className="pt-14 pb-6 container mx-auto px-4"> 
      <div className="max-w-2xl mx-auto relative group">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 outline-none text-slate-700"
          placeholder={placeholder}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Search;