import React, { useContext } from 'react';
import Layout from './Layout'; // You can customize this layout component
import { CartContext } from './context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cartData,
    GrandTotal,
    subTotal,
    shipping,
    updateQty,
    removeFromCart
  } = useContext(CartContext);

  const handleQtyChange = (e, item) => {
    const newQty = parseInt(e.target.value, 10);
    if (newQty > 0) {
      updateQty(item.id, newQty);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <Layout>
      <div className="container my-5">
        <nav aria-label="breadcrumb" className="py-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Cart</li>
          </ol>
        </nav>

        <h2 className="border-bottom pb-3 mb-4">Shopping Cart</h2>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Name & Size</th>
                <th>Price</th>
                <th style={{ width: '110px' }}>Quantity</th>
                <th>Total</th>
                <th style={{ width: '50px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData && cartData.length > 0 ? (
                cartData.map((item) => {
                  const totalPrice = (item.price * item.qty).toFixed(2);

                  return (
                    <tr key={item.id}>
                      <td style={{ width: '100px' }}>
                        <img
                          src={item.image_url}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="img-thumbnail"
                        />
                      </td>
                      <td>
                        <div className="fw-semibold">{item.title}</div>
                        <div>
                          {item.size?.sizes?.name ? (
                            <button className="btn btn-outline-secondary btn-sm mt-1" disabled>
                              Size: {item.size.sizes.name}
                            </button>
                          ) : (
                            <small className="text-muted">No size selected</small>
                          )}
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.qty}
                          min="1"
                          onChange={(e) => handleQtyChange(e, item)}
                          style={{ maxWidth: '80px' }}
                        />
                      </td>
                      <td>${totalPrice}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemove(item.id)}
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="row justify-content-end mt-4">
          <div className="col-md-4">
            <div className="d-flex justify-content-between border-bottom py-2">
              <strong>Subtotal</strong>
              <span>${subTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <strong>Shipping</strong>
              <span>${shipping().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between py-3 fs-5 fw-bold">
              <strong>Grand Total</strong>
              <span>${GrandTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-end">
              <Link to={`/checkout`} className="btn btn-primary btn-lg">Proceed To Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
