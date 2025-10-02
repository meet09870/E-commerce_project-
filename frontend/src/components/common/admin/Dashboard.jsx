import React from 'react';
import Layout from '../Layout';
import Sidebar from '../Sidebar';


const Dashboard = () => {
  return (
    <Layout>
      <div className="container p-3">
        <div className="row">
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
          </div>
          <div className="col-md-3">
           <Sidebar/>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col md-4">
              <div className="card shadow">
              <div className="card-body">
                <h2>1</h2>
                <span>users</span>
              </div>
              <div className="card-footer">
                  <a href="#">ViewUser</a>
              </div>
            </div>
              </div>
               <div className="col md-4">
                <div className="card shadow">
              <div className="card-body">
                <h2>1</h2>
                <span>orders</span>
              </div>
              <div className="card-footer">
                  <a href="#">ViewOrders</a>
              </div>
            </div>
              </div>
               <div className="col md-4">
                <div className="card shadow">
              <div className="card-body">
                <h2>1</h2>
                <span>Product</span>
              </div>
              <div className="card-footer">
                  <a href="#">ViewProduct</a>
              </div>
            </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

 
