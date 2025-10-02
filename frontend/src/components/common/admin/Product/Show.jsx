import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import Sidebar from "../../Sidebar";
import Loder from "../../Loder";
import Nostate from "../../Nostate";
import { Link } from "react-router-dom";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { adminToken, apiUrl } from "../../htt";
import { toast } from "react-toastify";

const Show = () => {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchproduct = async () => {
    setLoader(true);
    await fetch(`${apiUrl}/product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        if (result.status == 200 || result.status === true) {
          setProducts(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const deleteProduct = async (id) => {
   if (window.confirm("Are you sure you want to delete this product?")) {
    const res = await fetch(`${apiUrl}/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken()}`,
      },
    });

    const result = await res.json();
    if (result.status === 200) {
      const newProducts = products.filter(product => product.id !== id);
      setProducts(newProducts);
      toast.success(result.message);
    } else {
      toast.error(result.message || "Something went wrong");
    }
      
    }
  
    
  
};

  
  useEffect(() => {
    fetchproduct();
    
  }, []);

  //  Search filter logic
  const filteredProducts = products.filter((product) => {
    return (
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.sku?.toLowerCase().includes(search.toLowerCase()) ||
      String(product.price).toLowerCase().includes(search.toLowerCase())
    );
  });

  //  Delete Function 
  const deletecategories = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product with id:", id);
    }
  };

  return (
    <Layout>
      <div className="container p-3">
        <div className="row mt-5">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-3 align-items-center">
              <h4 className="mb-0 fw-bold">📦 Product Management</h4>
              <Link to="/admin/product/create" className="btn btn-primary">
                + Create Product
              </Link>
            </div>

            {/*  Search Box */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder=" 🔍 Search by name, SKU or price..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loader ? (
              <div className="text-center my-5">
                <Loder />
              </div>
            ) : filteredProducts.length === 0 ? (
              <Nostate text="No products found" />
            ) : (
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light text-muted">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>SKU</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <tr key={product.id} className="border-bottom">
                        <td className="text-center fw-bold">{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={product.image_url || "https://placehold.co/50x50"}
                              alt={product.title}
                              width="45"
                              height="45"
                              className="rounded border me-2"
                              style={{ objectFit: "cover" }}
                            />
                            <div>
                              <div className="fw-semibold">{product.title}</div>
                              <small className="text-muted">ID: {product.id}</small>
                            </div>
                          </div>
                        </td>
                        <td className="text-success fw-bold">${product.price}</td>
                        <td>{product.qty}</td>
                        <td>
                          <span className="badge bg-secondary">{product.sku}</span>
                        </td>
                        <td>
                          {product.status === 1 ? (
                            <span className="badge rounded-pill bg-success px-3 py-2">
                              Active
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-danger px-3 py-2">
                              Blocked
                            </span>
                          )}
                        </td>
                     <td className="text-center">
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                          <Link
                            to={`/admin/product/edit/${product.id}`}
                            className="btn d-flex align-items-center gap-1 btn-sm rounded-pill btn-outline-primary shadow-sm"
                            style={{ fontSize: '0.75rem', padding: '4px 8px', minWidth: '70px' }} // smaller text, padding, width
                          >
                            <BiEditAlt size={13} /> Edit
                          </Link>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="btn d-flex align-items-center gap-1 btn-sm rounded-pill btn-outline-danger shadow-sm"
                            style={{ fontSize: '0.75rem', padding: '4px 8px', minWidth: '70px' }} // smaller text, padding, width
                          >
                            <BiTrashAlt size={13} /> Delete
                          </button>
                        </div>
                      </td>


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;