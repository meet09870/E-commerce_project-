import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import { adminToken, apiUrl } from '../../htt';
import Loder from '../../Loder';
import Nostate from '../../Nostate';
import { BiTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { toast } from 'react-toastify';

const Show = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchCategories = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        headers: {
          
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`
        }
      });

      const result = await res.json();
      if (result.status === 200 && Array.isArray(result.data)) {
        setCategories(result.data);
      } else {
        console.error('Unexpected response:', result);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoader(false);
    }
  };

  // delete method 
const deletecategories = async (id) => {
      try {
        const res = await fetch(`${apiUrl}/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${adminToken()}`
          },
        });

        const result = await res.json();

        if (result.status === 200) {
          const newCategory = categories.filter(category => category.id !== id);
          setCategories(newCategory);
          toast.success(result.message || 'Category deleted successfully');
        } else {
          toast.error(result.message || 'Something went wrong');
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete category");
      }
    };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container p-3">
        <div className="row mt-5">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-3">
              <h4 className="mb-0">Categories</h4>
              <Link to="/admin/categories/create" className="btn btn-primary">Create</Link>
            </div>

            {loader ? (
              <div className="text-center my-5">
                <Loder />
              </div>
            ) : categories.length === 0 ? (
              <Nostate text="Category not found"/>
            ) : (
              <div className="card shadow">
                <div className="card-body p-4">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th width="50">Id</th>
                        <th>Name</th>
                        <th width="100">Status</th>
                        <th width="100">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>
                            {category.status === 1 ? (
                              <span className="badge bg-success">Active</span>
                            ) : (
                              <span className="badge bg-danger">Blocked</span>
                            )}
                          </td>
                          <td>
                            <Link
                              to={`/admin/categories/edit/${category.id}`}
                              className="me-2 text-decoration-none text-primary"
                            >
                             <BiEditAlt />
                            </Link>
                           <Link
                              onClick={() => deletecategories(category.id)}
                              className="text-danger text-decoration-none"
                            >
                              <BiTrashAlt />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;
