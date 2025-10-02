import React, { useContext, useState } from 'react';
import Layout from './Layout';
import { CartContext } from './context/CartContext';
import { useForm } from 'react-hook-form';
import { apiUrl,UserToken} from './htt';
import { sub } from 'framer-motion/m';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { cartData,subTotal,GrandTotal,shipping } = useContext(CartContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const processOrder = (data) => {
    console.log(data);
    if(paymentMethod == 'cod'){
      saveOrder(data,'not paid')

    }
  };

  const saveOrder = (formData,paymentStatus) =>{
    console.log(cartData)
    const newFormData = {...formData,grandtotal:GrandTotal(),subtotal:subTotal(),shipping:shipping(),discount:0,
      payment_status:paymentStatus,status:'pending',
      cart:(cartData)
    }
    fetch(`${apiUrl}/save-orders`,{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' :`Bearer ${UserToken()}`
      },
      body:JSON.stringify(newFormData)
    }).then(res =>res.json())
    .then(result => {
      if (result.status == 200){
        localStorage.removeItem('cart');
        navigate(`/order/confirm/${result.id}`)
      }else{
        toast.error(result.message||"somthing eroor")
      }
      // console.log(result);
    })

  }

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Checkout</li>
              </ol>
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit(processOrder)} className="row">
          {/* Billing Details */}
          <div className="col-md-7">
            <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
            <div className="row pt-3">

              <div className="col-md-6 mb-3">
                <input
                  {...register('name', { required: "Name is required" })}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
                {errors.name && <small className="text-danger">{errors.name.message}</small>}
              </div>

              <div className="col-md-6 mb-3">
                <input
                  {...register('email', { required: "Email is required" })}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </div>

              <div className="col-12 mb-3">
                <textarea
                  {...register('address', { required: "Address is required" })}
                  className="form-control"
                  rows={3}
                  placeholder="Address"
                ></textarea>
                {errors.address && <small className="text-danger">{errors.address.message}</small>}
              </div>

              <div className="col-md-6 mb-3">
                <input
                  {...register('city', { required: "City is required" })}
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
                {errors.city && <small className="text-danger">{errors.city.message}</small>}
              </div>

              <div className="col-md-6 mb-3">
                <input
                  {...register('state', { required: "State is required" })}
                  type="text"
                  className="form-control"
                  placeholder="State"
                />
                {errors.state && <small className="text-danger">{errors.state.message}</small>}
              </div>

              <div className="col-md-6 mb-3">
                <input
                  {...register('zip', { required: "Zip is required" })}
                  type="text"
                  className="form-control"
                  placeholder="Zip"
                />
                {errors.zip && <small className="text-danger">{errors.zip.message}</small>}
              </div>

              <div className="col-md-6 mb-3">
                <input
                  {...register('number', { required: "Phone number is required" })}
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                />
                {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
              </div>
            </div>
          </div>

          {/* Order Summary and Payment */}
          <div className="col-md-5">
            <h3 className='border-bottom pb-3'><strong>Items</strong></h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {cartData && cartData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image_url}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="img-thumbnail"
                      />
                    </td>
                    <td>
                      {item.title}
                      <br />
                      {item.size?.sizes?.name ? (
                        <span className="badge bg-primary">Size: {item.size.sizes.name}</span>
                      ) : (
                        <small className="text-muted">No size selected</small>
                      )}
                    </td>
                    <td>${item.price}</td>
                    <td>{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row">
              <div className="col-md-12">
                <div className='d-flex justify-content-between border-bottom pb-3'>
                  <div>SubTotal</div>
                  <div>${subTotal()}</div>
                </div>
                <div className='d-flex justify-content-between border-bottom pb-3'>
                  <div>Shipping</div>
                  <div>${shipping()}</div>
                </div>
                <div className='d-flex justify-content-between pb-3'>
                  <div>Grand Total</div>
                  <div>${GrandTotal()}</div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <h3 className='border-bottom pt-4 pb-3'><strong>Payment Method</strong></h3>
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="radio"
                  id="stripe"
                  className="form-check-input"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="stripe" className="form-check-label">Stripe</label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  id="cod"
                  className="form-check-input"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cod" className="form-check-label">Cash on Delivery</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Pay Now</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
