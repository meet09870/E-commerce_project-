import React, { useState } from 'react'
import Layout from '../../Layout'
import Sidebar from '../../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../htt';

const Edit = () => {
    const navigate = useNavigate();
    const params =useParams();
    const [brand,setBrand]=useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues :async () =>{
       const res = await fetch(`${apiUrl}/brands/${params.id}`,{
         method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`
        },
       })
       .then(res=> res.json())
       .then(result =>{
        console.log(result)
        if(result.status == 200){
          setBrand(result.data)
          reset({
            name: result.data.name,
            status:result.data.status
          })
        } else{
            console.log("somthis went wrong")
        }
    })
    }
  });

  const saveBrand = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/brands/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result.status === 201 || result.status === 200) {
        navigate('/admin/brands');
      } else {
        alert(result.message || 'Failed to create brand');
      }
    } catch (err) {
      console.error('Create error:', err);
      alert('An error occurred while creating the brand');
    }
  };
  return (
  <>
      <Layout>
      <div className="container p-3">
        <div className="row mt-5">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-3">
              <h4 className="h4 mb-0">Brand/Edit</h4>
              <Link to="#" className='btn btn-primary'>Button</Link>
            </div>
                <form onSubmit={handleSubmit(saveBrand)}>
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
                <button type="submit" className="btn btn-primary mt-3">Update</button>
                </form>
          </div>
        </div>
      </div>
    </Layout>
  </>
  )
}

export default Edit
