import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNavBar = ({ itemChanged, fun1 }) => {
  return (
    <nav className="navbar" style={{ marginBottom: "30px" }}>
      <ToastContainer />
      <div className="nav-items-left navbar-items">
        <Link to="/admin" className="navbar-link">
          HOME
        </Link>
      </div>

      <div className="nav-items-right navbar-items">
        <div className="dropdown">
          <Link to="/admin" className="navbar-link dropbtn">
            Admin
          </Link>
          <div className="dropdown-content">
            <Link to="/admin/additem">Add Item</Link>
            <Link to="/admin/orders">Orders</Link>
            <Link to="/admin/logout">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
