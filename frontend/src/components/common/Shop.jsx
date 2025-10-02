import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { apiUrl } from '../common/htt';
import { Link, useSearchParams } from 'react-router-dom';

const Shop = () => {
  const [Categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [catchecked, setCatchecked] = useState(() => {
    const category = searchParams.get('category');
    return category ? category.split(',') : [];
  });

  const [brandchecked, setBrandtchecked] = useState(() => {
    const brands = searchParams.get('brands');
    return brands ? brands.split(',') : [];
  });

  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-categories`);
      const result = await res.json();
      setCategories(result.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-brand`);
      const result = await res.json();
      setBrands(result.data);
    } catch (err) {
      console.error('Failed to fetch brands', err);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);

    const search = [];
    let params = '';

    if (catchecked.length > 0) {
      search.push(['category', catchecked.join(',')]);
    }

    if (brandchecked.length > 0) {
      search.push(['brands', brandchecked.join(',')]);
    }

    if (search.length > 0) {
      params = new URLSearchParams(search);
      setSearchParams(params);
    } else {
      setSearchParams([]);
    }

    try {
      const res = await fetch(`${apiUrl}/get-product?${params}`);
      const result = await res.json();
      setProducts(result.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  const handlecategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCatchecked((prev) => [...prev, value.toString()]);
    } else {
      setCatchecked((prev) => prev.filter((id) => id !== value.toString()));
    }
  };

  const handlebrand = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setBrandtchecked((prev) => [...prev, value.toString()]);
    } else {
      setBrandtchecked((prev) => prev.filter((id) => id !== value.toString()));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [catchecked, brandchecked]);

  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Shop</li>
          </ol>
        </nav>

        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            {/* Categories */}
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Categories</h3>
                <ul className="list-unstyled">
                  {Categories.map((cat) => (
                    <li className="mb-2" key={cat.id}>
                      <input
                        type="checkbox"
                        value={cat.id}
                        onChange={handlecategory}
                        checked={catchecked.includes(cat.id.toString())}
                      />
                      <label className="ps-2">{cat.name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brands */}
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Brands</h3>
                <ul className="list-unstyled">
                  {brands.map((brand) => (
                    <li className="mb-2" key={brand.id}>
                      <input
                        type="checkbox"
                        value={brand.id}
                        onChange={handlebrand}
                        checked={brandchecked.includes(brand.id.toString())}
                      />
                      <label className="ps-2">{brand.name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-md-9">
            <div className="row pb-5">
              {loading ? (
                <div className="text-center py-5 w-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                        ) : products.length > 0 ? (
                          products.map((product) => (
                            <div className="col-md-4 col-6" key={product.id}>
                              <div className="product card border-0">
                                <div className="card-img">
                                  <img src={product.image_url} alt={product.title} className="w-100" />
                                </div>
                                <div className="card-body pt-3">
                                  <Link to={`/product/${product.id}`}>
                                    <h5 className="card-title">{product.title}</h5>
                                  </Link>
                                  <div className="price mt-2">
                                    ${product.compare_price}
                                    {' '}
                                    <span className="text-decoration-line-through text-muted">
                                      ${product.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-5 w-100">
                            <p>No products found.</p>
                          </div>
                        )}
                      </div>
                    </div>

        </div>
      </div>
    </Layout>
  );
};

export default Shop;
