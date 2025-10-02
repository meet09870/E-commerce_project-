import React, { useEffect, useState } from 'react'
import { apiUrl } from '../common/htt';
import { Link } from 'react-router-dom';

const LatestProduct = () => {
  const [LatestProduct, setLatestProduct] = useState([]);

  const Latestproduct = async () => {
    await fetch(apiUrl + '/get-latest-product', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        setLatestProduct(result.data)
      })
  }

  useEffect(() => {
    Latestproduct();
  }, [])

  return (
    <section className="section-2 py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">🆕 New Arrivals</h2>
        <div className="row g-4">
          {
            LatestProduct && LatestProduct.map(product => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={`LatestProducts-${product.id}`}>
                <div className="custom-card">
                  <div className="card-img-container">
                    <img src={product.image_url} alt={product.title} className='card-img' />
                  </div>
                  <div className='card-details'>
                    <Link to={`/product/${product.id}`} className="product-title">{product.title}</Link>
                    <div className="price">
                      ₹{product.price}
                      <span className='old-price'>₹{product.compare_price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default LatestProduct;
