import React from 'react'
import logo from "../../assets/babycare logo.jpg"
import { useNavigate } from 'react-router-dom';
function AdminNavbar() {
  const navigate=useNavigate()
  return (
    <div >
      
      <div className="navbar bg-sky-600">
  <div className="flex-1">
     <label htmlFor="my-drawer-2" className="px-2 drawer-button ">  

        <img  className='w-16 h-12 rounded-full' src={logo} alt="" />
      </label>
      <h1 className='text-2xl font-bold'>TRUE CARE</h1>
  </div>
  <div className="flex-none gap-2">
   
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        {/* <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div> */}
        <h1 className='mr-5'>Account</h1>
      </label>
      <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
           
          </a>
        </li>
      
        <li>
                  <a
                    onClick={() => {
                      localStorage.removeItem("adminToken");
                      navigate("/admin/adminLogin");
                    }}
                  >
                    Logout
                  </a>
                </li>
      </ul>
    </div>
  </div>
</div>
      
    </div>
  )
}

export default AdminNavbar