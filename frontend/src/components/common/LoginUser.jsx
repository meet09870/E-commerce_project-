import React, { useContext } from 'react';
import Layout from './Layout';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl } from './htt';
import { AuthContext } from './context/Auth';


const LoginUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const{login} = useContext(AuthContext)

  const navigate = useNavigate();

 const onSubmit = async(data) => {
     console.log(data);
         const res = await fetch(`${apiUrl}/login`,{
           method:'POST',
           headers:{
             'content-type':'application/json'
           },
           body:JSON.stringify(data)
         }).then(res=> res.json())
         .then(result =>{
          //  console.log(result)
           if(result.status==200){
             const userInfo={
               token: result.token,
               id:result.id,
               name:result.name
             }
             localStorage.setItem('userInfo',JSON.stringify(userInfo))
            login(userInfo);
            navigate('/')
 
           }else{
             toast.error(result.message);
           }
         })
   };
 
  return (
   
      <div className="ecommerce-page-container">
        <div className="ecommerce-form-card">
          <form className="ecommerce-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-header">
              <h2>Welcome Back!</h2>
              <p>Log in to access your account.</p>
            </div>

            {/* Email */}
            <div className="form-input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope icon"></i>
                <input
                  {...register('email', {
                    required: 'The Email field is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="name@example.com"
                  id="email"
                />
              </div>
              {errors.email && (
                <p className="invalid-feedback-text">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock icon"></i>
                <input
                  {...register('password', { required: 'The Password field is required.' })}
                  type="password"
                  className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  id="password"
                />
              </div>
              {errors.password && (
                <p className="invalid-feedback-text">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="form-submit-btn">
              Log In
            </button>

            <div className="login-link-container">
              <p>
                Don't have an account?{' '}
                <a href="/register" className="login-link">
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
   
  );
};

export default LoginUser;
