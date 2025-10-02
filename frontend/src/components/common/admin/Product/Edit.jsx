import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../../Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Sidebar from '../../Sidebar';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../htt';
import { toast } from 'react-toastify';


const Edit = ({ placeholder }) => {
  const navigate = useNavigate();
   const { id } = useParams();
  const [content, setContent] = useState('');
  const [loader, setLoader] = useState(false);
  const params =useParams();
  const [brands, setBrands] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [size, setSize] = useState([]);
  const [sizeChecked, setSizeChecked] = useState([]);
  // const [gallery, setGallery] = useState([]);
  // const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'content',
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      const result = await res.json();
      setProductImages(result.data.product_images);
      setSizeChecked(result.productSize)
      reset({
        title: result.data.title,
        categories: result.data.categories_id,
        brands: result.data.brands_id,
        sku: result.data.sku,
        qty: result.data.qty,
        price: result.data.price,
        compare_price: result.data.compare_price,
        barcode: result.data.barcode,
        short_description: result.data.short_description,
        status: result.data.status,
        is_featured: result.data.is_featured,
      });

      setContent(result.data.description || '');
      setLoader(false);
    },
  });

  //  Save Product (Update)
  const saveproduct = async (data) => {
  setLoader(true);

  const formData = {
    ...data,
    description: content,
  };

  try {
    const res = await fetch(`${apiUrl}/product/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    setLoader(false);

    if (result.status == 200) {
      toast.success(result.message);
      navigate('/admin/product');
    } else {
      console.log("Something went wrong");
      toast.error(result.message || "Something went wrong");
    }
  } catch (error) {
    setLoader(false);
    console.error("Error occurred:", error);
    toast.error("Server error occurred");
  }
};

  //  Fetch Categories
  const fetchCategory = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    const result = await res.json();
    setLoader(false);
    if (result.status === 200) {
      setCategories(result.data);
    }
  };

  //  Fetch Brands
  const fetchBrand = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    const result = await res.json();
    setLoader(false);
    if (result.status === 200) {
      setBrands(result.data);
    }
  };

  // size fetch
    const fetchSize = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`,
      },
    })
    .then(res => res.json())
    .then(result =>{
      console.log(result);
      setSize(result.data)
    })
  };


  //  Upload Product Image
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    formData.append('products_id', id);

    setLoader(true);

    try {
      const res = await fetch(`${apiUrl}/save-product-image`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (result.status === 200) {
        setProductImages([...productImages, result.data]);
      } else {
        if (result.errors?.image) {
          toast.error(result.errors.image[0]);
        } else {
          toast.error('Something went wrong!');
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed, try again.');
    } finally {
      e.target.value = '';
      setLoader(false);
    }
  };

  
  const deleteimage = async (id) => {
  const res = await fetch(`${apiUrl}/delete-product-image/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${adminToken()}`,
    },
  });

  const result = await res.json();
  if (result.status === 200) {
    const newProductImage = productImages.filter(img => img.id !== id);
    setProductImages(newProductImage);
    toast.success(result.message);
  } else {
    toast.error(result.message || "Something went wrong");
  }
}

  //  Change default image
  const changeImage = async (image) => {
    const res = await fetch(
      `${apiUrl}/default-image?products_id=${id}&image=${image}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`,
        },
      }
    );
    const result = await res.json();
    setLoader(false);
    if (result.status == 200) {
      toast.success(result.message || 'Default Image changed successfully');
    }
    navigate('/admin/product');
  };

  useEffect(() => {
    fetchCategory();
    fetchBrand();
    fetchSize();
    
  }, []);

  return (
    <Layout>
      <div className="container p-5">
        <div className="row mt-5">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-3">
              <h4 className="h4 mb-0">Edit Product</h4>
              <Link to="/admin/product" className="btn btn-primary">
                back
              </Link>
            </div>
            <div className="card shadow p-4">
              <form onSubmit={handleSubmit(saveproduct)}>
                <div className="row">
                  {/* Title */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? 'is-invalid' : ''
                      }`}
                      {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">
                        {errors.title.message}
                      </div>
                    )}
                  </div>

                  {/* SKU */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">SKU</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.sku ? 'is-invalid' : ''
                      }`}
                      {...register('sku', { required: 'SKU is required' })}
                    />
                    {errors.sku && (
                      <div className="invalid-feedback">
                        {errors.sku.message}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${
                        errors.price ? 'is-invalid' : ''
                      }`}
                      {...register('price', { required: 'Price is required' })}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">
                        {errors.price.message}
                      </div>
                    )}
                  </div>

                  {/* Compare Price */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Compare Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      {...register('compare_price')}
                    />
                  </div>

                  {/* Quantity */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      {...register('qty')}
                    />
                  </div>

                  {/* Barcode */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Barcode</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register('barcode')}
                    />
                  </div>

                  {/* Category */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className={`form-control ${
                        errors.categories ? 'is-invalid' : ''
                      }`}
                      {...register('categories', {
                        required: 'Category is required',
                      })}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.categories && (
                      <div className="invalid-feedback">
                        {errors.categories.message}
                      </div>
                    )}
                  </div>

                  {/* Brand */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Brand</label>
                    <select className="form-control" {...register('brands')}>
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Short Description */}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      {...register('short_description')}
                    ></textarea>
                  </div>

                  {/* Description */}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Description</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className={`form-control ${
                        errors.status ? 'is-invalid' : ''
                      }`}
                      {...register('status', { required: 'Status is required' })}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Blocked</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">
                        {errors.status.message}
                      </div>
                    )}
                  </div>

                  {/* Is Featured */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Is Featured</label>
                    <select
                      className={`form-control ${
                        errors.is_featured ? 'is-invalid' : ''
                      }`}
                      {...register('is_featured')}
                    >
                      <option value="">Select Option</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </div>

                      <div className="mb-3">
                      <label htmlFor="">Sizes:</label>

                      {size && size.map((s) => {
                        return (
                          <div className="form-check-inline ps-2" key={`psize-${s.id}`}>
                            <input
                              {...register("sizes")}
                              checked={sizeChecked.includes(s.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSizeChecked([...sizeChecked, s.id]); 
                                } else {
                                  setSizeChecked(sizeChecked.filter((sid) => sid !== s.id)); 
                                }
                              }}
                              className="form-check-input"
                              type="checkbox"
                              value={s.id}
                              id={`sizes-${s.id}`}
                            />
                            <label className="form-check-label ps-2" htmlFor={`sizes-${s.id}`}>
                              {s.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>


                        

                  {/* Image */}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFile}
                    />
                  </div>

                  {/* Product Images */}
                  <div className="mb-3">
                    <div className="row">
                      {productImages &&
                        productImages.map((productImages, index) => (
                          <div className="col-md-3" key={`index-${index}`}>
                            <div className="card shadow">
                              <img
                                src={productImages.image_url}
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-danger mt-3 w-100"
                              onClick={() => deleteimage(productImages.id)}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary mt-3 w-100"
                              onClick={() => changeImage(productImages.image)}
                            >
                              Set Default
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  {loader ? 'Saving...' : 'Update Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
