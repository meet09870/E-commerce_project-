import React, { useEffect, useState } from 'react'
import ProductImg from '../../assets/eight.jpg';
import { apiUrl } from '../common/htt';
import { Link } from 'react-router-dom';
const FeatureProduct = () => {
    const [featuredProduct,setfeaturedProduct] = useState([]);
    const  FeaturedProduct = async () =>{
      await fetch(apiUrl+'/get-featured-product',{
        method: 'GET',
        headers:{
          'Content-type' : 'application/json',
          'Accept' : 'application/json',
        }
      })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setfeaturedProduct(result.data)
      })
  
    }
    useEffect(() =>{
     FeaturedProduct();
    },[])
  return (
    <section className="section-2 py-5">
       <div className="container">
           <h2>Feature Product</h2>
           <div className='row mt-4'>
     {
            featuredProduct && featuredProduct.map(FeaturedProduct =>{
              return(
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={`FeaturedProduct-${FeaturedProduct.id}`}>
                <div className="custom-card">
                  <div className="card-img-container">
                    <img src={FeaturedProduct.image_url} alt={FeaturedProduct.title} className='card-img' />
                  </div>
                  <div className='card-details'>
                    <Link to={`/product/${FeaturedProduct.id}`} className="product-title">{FeaturedProduct.title}</Link>
                    <div className="price">
                      ₹{FeaturedProduct.price}
                      <span className='old-price'>₹{FeaturedProduct.compare_price}</span>
                    </div>
                  </div>
                </div>
              </div>

              )
            })
          }

                 
           </div>
       </div>
   
     </section>
  )
}

export default FeatureProduct
