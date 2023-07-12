import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <>
      <div className="drawer-side max-w-fit">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="max-w-full p-4 text-2xl font-bold text-black bg-indigo-300">
          <li className="m-3">
            <Link to="/admin">Baby Care</Link>
          </li>
          <li className="m-3">
            <Link to="/admin/category">Department</Link>
          </li>
          <li className="m-3">
            <Link to="/admin/banner">Banner</Link>
          </li>
          <li className="m-3">
            <Link to="/admin/plans">Plans</Link>
          </li>
          <li className="m-3">
            <Link to="/admin/doctor">Doctors</Link>
          </li>
          <li className="m-3">
            <Link to="/admin/doctorApprovel">New Doctor</Link>
          </li>
          <li className="m-3">
            <Link to="/admin/allBooking">Bookings</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
