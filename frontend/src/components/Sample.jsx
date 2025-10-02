import React from 'react'
import Sidebar from './common/Sidebar'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'

const Sample = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-3">
              <h4 className="h4 mb-0">Your Title</h4>
              <Link to="#" className='btn btn-primary'>Button</Link>
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

export default Sample
