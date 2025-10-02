import React from 'react'
import Layout from './Layout'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl } from './htt';


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.status === 201 && result.status) {
        toast.success(result.message);
        navigate('/LoginUser');
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach(errorMsg => {
            toast.error(errorMsg[0]);
          });
        } else {
          toast.error(result.message || 'Registration failed');
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <Layout>
      <div className="ecommerce-page-container">
        <div className="ecommerce-form-card">
          <form className="ecommerce-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Register to unlock exclusive offers.</p>
            </div>

            {/* Name */}
            <div className="form-input-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <i className="fas fa-user icon"></i>
                <input
                  {...register('name', { required: 'The Name field is required.' })}
                  type="text"
                  className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter your full name"
                  id="name"
                />
              </div>
              {errors.name && (
                <p className="invalid-feedback-text">{errors.name.message}</p>
              )}
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
                  placeholder="Enter a password"
                  id="password"
                />
              </div>
              {errors.password && (
                <p className="invalid-feedback-text">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="form-submit-btn">
              Create Account
            </button>

            <div className="login-link-container">
              <p>Already have an account?{' '}
                <a href="/LoginUser" className="login-link">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;