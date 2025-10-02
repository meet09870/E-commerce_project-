

import React from 'react';
import Layout from '../../Layout';
import Sidebar from '../../Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../htt';

const Create = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const saveCategory = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result.status === 201 || result.status === 200) {
        navigate('/admin/categories');
      } else {
        alert(result.message || 'Failed to create category');
      }
    } catch (err) {
      console.error('Create error:', err);
      alert('An error occurred while creating the category');
    }
  };

  return (
    <Layout>
      <div className="container mt-5 p-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-3">
              <h4>Create Category</h4>
              <Link to="/admin/categories" className="btn btn-secondary">Back</Link>
            </div>
            <form onSubmit={handleSubmit(saveCategory)}>
              <div className="card shadow">
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                      {...register('status', { required: 'Status is required' })}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Blocked</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status.message}</div>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Create</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
