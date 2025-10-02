import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/common/Home';
import Shop from './components/common/Shop';
import Product from './components/common/Product';
import Cart from './components/common/Cart';
import Checkout from './components/common/Checkout';
import Login from './components/common/admin/Login';
import Dashboard from './components/common/admin/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminRequireAuth } from './components/common/admin/AdminRequireAuth';
import {default as ShowCategories} from './components/common/admin/category/Show';
import { default as CreateCategory } from './components/common/admin/category/Create';
import Edit from './components/common/admin/category/Edit';
import Show from './components/common/admin/brands/Show';
import Create from './components/common/admin/brands/Create';
import {default as Editbrands}  from './components/common/admin/brands/Edit';
import {default as Productshow}  from './components/common/admin/Product/Show';
import {default as Productedit}  from './components/common/admin/Product/Edit';
import {default as Productcreate}  from './components/common/admin/Product/Create';
import NetworkChecker from './components/common/NetworkChecker';
import Register from './components/common/Register';
import {default as LoginUser} from './components/common/LoginUser';
import Profile from './components/Profile';
import { RequireAuth } from './components/RequireAuth';
import Confirmation from './components/common/Confirmation';






function App() {
  return (
    <>
      <BrowserRouter>
        {/*  Global Internet Check */}
        <NetworkChecker />  

        <Routes>
          {/* user Routes */}
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/LoginUser' element={<LoginUser/>} /> 

          <Route 
              path='/'
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } 
            />
         
          <Route 
              path='/account'
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } 
            />

             <Route 
              path='/checkout'
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              } 
            />

            <Route 
              path='/order/confirm/:id'
              element={
                <RequireAuth>
                  <Confirmation/>
                </RequireAuth>
              }
            />


            
          
          <Route path='/admin/login' element={<Login />} />
          <Route 
              path='/admin/dashboard' 
              element={
                <AdminRequireAuth>
                  <Dashboard />
                </AdminRequireAuth>
              } 
            />
            <Route 
              path='/admin/categories' 
              element={
                <AdminRequireAuth>
                  <ShowCategories />
                </AdminRequireAuth>
              } 
            />
               <Route 
                path='/admin/categories/create' 
                element={
                  <AdminRequireAuth>
                    <CreateCategory />
                  </AdminRequireAuth>
                } 
              />
            <Route 
              path='/admin/categories/edit/:id' 
              element={
                <AdminRequireAuth>
                  <Edit />
                </AdminRequireAuth>
              } 
            />

             <Route 
              path='/admin/brands' 
              element={
                <AdminRequireAuth>
                  <Show />
                </AdminRequireAuth>
              } 
            />

            <Route 
                path='/admin/brands/create' 
                element={
                  <AdminRequireAuth>
                    <Create />
                  </AdminRequireAuth>
                } 
              />

                <Route 
              path='/admin/brands/edit/:id' 
              element={
                <AdminRequireAuth>
                  <Editbrands/>
                </AdminRequireAuth>
              } 
            />

             <Route 
              path='/admin/product' 
              element={
                <AdminRequireAuth>
                  <Productshow />
                </AdminRequireAuth>
              } 
            />

             <Route 
              path='/admin/product/create' 
              element={
                <AdminRequireAuth>
                  <Productcreate />
                </AdminRequireAuth>
              } 
            />

            <Route 
              path='/admin/product/edit/:id' 
              element={
                <AdminRequireAuth>
                  <Productedit />
                </AdminRequireAuth>
              } 
            /> 
        </Routes>         
      </BrowserRouter>
      
      <ToastContainer />
    </>
  );
}

export default App;
