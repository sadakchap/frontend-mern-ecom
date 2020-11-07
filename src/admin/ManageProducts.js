import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {

    const { user, token } = isAuthenticated();
    const [products, setProducts] = useState([]);

    const preloadProducts = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }
            setProducts(data);
        });
    }

    useEffect(() => {
        preloadProducts();
        // eslint-disable-next-line
    }, []);

    const removeProduct = (productId) => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error){

            }else{
                preloadProducts();
            }
        })
    }

    return (
        <Base title="Manage Products" description="Here, you can manage your products">
            <h2 className="mb-4">All Products:</h2>
            <Link to="/admin/dashboard" className="btn btn-info"><span>Admin Home</span></Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-white text-center my-3">Total {products.length} products</h2>
                    {products && products.map((prod, idx) => (
                        <div key={idx} className="row text-center mb-2">
                            <div className="col-4">
                                <h3 className="text-white text-left">{prod.name}</h3>
                            </div>
                            <div className="col-4">
                                <Link className="btn btn-success" to={`/admin/product/update/${prod._id}`}><span>Update</span></Link>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-danger" onClick={() => {removeProduct(prod._id)}}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Base>
    )
}

export default ManageProducts
