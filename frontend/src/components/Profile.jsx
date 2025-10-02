import React from 'react'
import Layout from './common/Layout'
import UserSidebar from './UserSidebar'

const Profile = () => {
  return (
   <Layout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-3">
              <h4 className="h4 mb-0">My Account</h4>
            </div>
            <div className="card shadow">
              <div className="card-body p-4">
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
