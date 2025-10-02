import React, { useContext } from 'react'
import { AuthContext } from './common/context/Auth';

const UserSidebar = () => {
    const{logout} = useContext(AuthContext);
  return (
    <div className="card shadow mb-5 sidebar">
      <div className="card-body p-4">
        <ul>
          <li>
            <a href="/account">Account</a>
          </li>
          <li>
            <a href="#">orders</a>
          </li>
          <li>
            <a href="#">ChangePassword</a> 
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

export default UserSidebar
