import React, { useEffect, useMemo, useRef, useState } from 'react'
import Layout from '../../Layout'
import { Link, useNavigate } from 'react-router-dom'
import JoditEditor from 'jodit-react'
import Sidebar from '../../Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../htt';

const Create = ({ placeholder }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loader, setLoader] = useState(false);
  const [brands, setBrands] = useState([]);
  const [gallery,setGallery]= useState([]);
  const [size, setSize] = useState([]);
  const [galleryImages,setGalleryImages]= useState([]);
  const [categories, setCategories] = useState([]);
   const [sizeChecked, setSizeChecked] = useState([]);

  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'content'
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const saveproduct = async (data) => {
    setLoader(true);

    const formData = { ...data, "description":content,"gallery":gallery}; 
    console.log(formData);

    try {
      const res = await fetch(`${apiUrl}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      setLoader(false);

      if (result.status === 200) {
        console.log('Product saved successfully');
         navigate('/admin/product');
      } else {
        console.log('Something went wrong');
      }
    } catch (err) {
      setLoader(false);
      console.error('Error:', err);
    }
  };

  const fetchCategory = async () => {
   const res=await fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        if (result.status === 200) {
          setCategories(result.data);
        } else {
          console.log('something went wrong');
        }
      });
  };

  const fetchBrand = async () => {
  const res = await  fetch(`${apiUrl}/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        if (result.status === 200) {
          setBrands(result.data);
        } else {
          console.log('something went wrong');
        }
      });
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    setLoader(true);

    const res = await fetch(`${apiUrl}/temp-image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`
      },
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        gallery.push(result.data.id)
        setGallery(gallery)

        galleryImages.push(result.data.image_url)
        setGalleryImages( galleryImages)
         e.target.value = ""
        setLoader(false);
       
        if (result.status === 200) {
          
        } else {
          console.log('something went wrong');
        }
      });
  };

  const  deleteimage = (image) => {
   const newgallery = galleryImages.filter(gallery => gallery != image)
   setGalleryImages(newgallery);

  }

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
  


  useEffect(() => {
    fetchCategory();
    fetchBrand();
    fetchSize();
   
  }, []);

  return (
    <>
      <Layout>
        <div className="container p-5">
          <div className="row mt-5">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between pb-3">
                <h4 className="h4 mb-0">Create Product</h4>
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
                          required: 'Category is required'
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
                        {...register('is_featured', {
                          required: 'Please select Featured Status'
                        })}
                      >
                        <option value="">Select Option</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {errors.is_featured && (
                        <div className="invalid-feedback">
                          {errors.is_featured.message}
                        </div>
                      )}
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

                    <div className="mb-3">
                      <div className='row'>
                        {
                          galleryImages && galleryImages.map((image,index)=>{
                            return(
                              <div className="col-md-3" key={`index-${index}`}>
                                <div className='card shadow'>
                                  <img src={image} alt="" className='w-100' />
                                  
                                </div>
                                <button className='btn btn-danger' onClick={() => deleteimage(image)}>Delete</button>
                              </div>
                            )
                          })
                        }
                        <div className="col-md-3">

                        </div>

                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    {loader ? 'Saving...' : 'Create Product'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Create;
