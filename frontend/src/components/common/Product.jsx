import React, { useContext, useEffect, useState } from 'react';
import Layout from './Layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import { Rating } from 'react-simple-star-rating';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl } from '../common/htt';
import { CartContext } from './context/CartContext';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [loader, setLoader] = useState(false);
    const [rating, setRating] = useState(4);
    const [product, setProduct] = useState([]);
    const [size, setSize] = useState([]);
    const [sizeSelected, setSizeSelected] = useState(null); // Now stores the entire size object
    const [productimage, setProductImage] = useState([]);
    const { addToData } = useContext(CartContext);
    const params = useParams();
    const navigate = useNavigate();


    const fetchproduct = async () => {
        setLoader(true);
        await fetch(`${apiUrl}/get-products/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer",
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setLoader(false);
                if (result.status === 200) {
                    console.log(result);
                    setProduct(result.data);
                    setProductImage(result.data.product_images);
                    setSize(result.data.products_sizes);
                } else {
                    console.log("Something went wrong");
                }
            });
    };

    const handleAddToCart = () => {
    if (size.length > 0) { // Check if sizes are available
        if (sizeSelected === null) {
            toast.error('Please select a size');
        } else {
            addToData(product, sizeSelected); // Pass the whole object
            toast.success('Product added to cart!');
            navigate('/cart'); //  Navigate to cart
        }
    } else {
        addToData(product, null); // Add product without size
        toast.success('Product added to cart!');
        navigate('/cart'); //  Navigate to cart
    }
};

    useEffect(() => {
        fetchproduct();
    }, []);

    return (
        <Layout>
            <div className="container product-detail mt-4">
                {/* Breadcrumb */}
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className="py-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row mb-5">
                    {/* Product Images */}
                    <div className="col-md-5">
                        <div className="row">
                            {/* Thumbnail Swiper */}
                            <div className="col-2">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    direction="vertical"
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >
                                    {productimage && productimage.map((product_images, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <div className="content">
                                                    <img src={product_images.image_url} alt="" height={100} className="w-100" />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>

                            {/* Main Swiper */}
                            <div className="col-10">
                                <Swiper
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="main-swiper"
                                >
                                    {productimage && productimage.map((product_images, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <div className="content">
                                                    <img src={product_images.image_url} alt="" className="w-100" />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="col-md-7">
                        <h2 className="product-title">{product.title}</h2>

                        {/* Star Rating */}
                        <div className="rating-wrapper my-3 d-flex align-items-center">
                            <Rating
                                size={25}
                                readonly
                                initialValue={rating}
                            />
                            <span className="ms-2">({rating} / 5)</span>
                        </div>

                        <p><strong>10 Reviews</strong></p>

                        {/* Price Section */}
                        <div className="price my-3">
                            <h4>
                                ${product.price} <span className="text-muted text-decoration-line-through ms-2">${product.compare_price}</span>
                            </h4>
                        </div>

                        {/* Description or other details */}
                        <p className="mt-4">
                            {product.short_description}
                        </p>
                        <div className='pt-3'>
                            <strong className='pt-3'>Select Size</strong>
                            <div className="sizes pt-2">
                                {
                                    size && size.map(products_sizes => {
                                        return (
                                            <button
                                                key={products_sizes.id}
                                                onClick={() => setSizeSelected(products_sizes)}
                                                className={`btn btn-size me-2 ${sizeSelected && sizeSelected.sizes_id === products_sizes.sizes_id ? 'active' : ''}`}
                                            >
                                                {products_sizes.sizes.name}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className=" add-to-cart my-4">
                            <button
                                onClick={() => handleAddToCart()}
                                className="btn btn-primary me-2"
                               
                            >
                                Add to Cart
                            </button>
                        </div>
                        <hr />

                        <div>
                            <strong>SKU:</strong>
                            {product.sku}
                        </div>
                    </div>
                </div>

                <div className="row pb-5">
                    <div className="col-md-12">
                        <Tabs
                            defaultActiveKey="description"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Description">
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews(10)">
                                Tab content for Reviews
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product;