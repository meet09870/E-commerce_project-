import React, { useContext } from 'react'
import { AdminAuthContext } from './context/AdminAuth';

const Sidebar = () => {
    const{logout} = useContext(AdminAuthContext);
  return (
   <div className="card shadow mb-5 sidebar">
      <div className="card-body p-4">
        <ul>
          <li>
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/admin/categories">Categories</a>
          </li>
          <li>
            <a href="/admin/brands">Brands</a>
          </li>
          <li>
            <a href="/admin/product">Products</a> 
          </li>
          <li>
            <a href="/orders">Orders</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
          <li>
            <a href="/shipping">Shipping</a>
          </li>
          <li>
            <a href="/change-password">Change Password</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
