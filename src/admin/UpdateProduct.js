import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { updateProduct, getCategories, getProduct } from './helper/adminapicall';

const UpdateProduct = ({ match }) => {

    const { user, token } = isAuthenticated();
    
    const productId = match.params.productId;

    const [values, setValues] = useState({
        name: '',
        desc: '',
        price: '',
        stock: '',
        photo: '',
        category: '',
        loading: false,
        error: '',
        updatedProduct: '',
        getRedirect: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const { name, desc, price, stock, loading, error, category, updatedProduct, getRedirect, formData } = values;

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, error: "", loading: true });
        updateProduct(productId, user._id, token, formData).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error });
            }else{
                setValues({
                    name: '',
                    desc: '',
                    price: '',
                    stock: '',
                    photo: '',
                    category: '',
                    loading: false,
                    error: '',
                    updatedProduct: data.name,
                    formData: ''
                });

                setTimeout(() => {
                    setValues({ ...values, getRedirect: true });
                }, 2000);
            }
        }).catch(err => {
            console.log(err);
            setValues({ ...values, error: err.response.data.error });
        })
        
    }

    const preloadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setCategories(data);
            }
        }).catch(err => {
            console.log(err);
        });
    }
        
    const preload = () => {
        preloadCategories();
        // get product
        getProduct(productId).then(data => {
            setValues({
                ...values,
                name: data.name,
                desc: data.desc,
                price: data.price,
                stock: data.stock,
                category: data.category._id,
                loading: false,
                error: '',
                formData: new FormData()
            });
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        preload();
        // eslint-disable-next-line
    }, []);

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: updatedProduct ? '' : 'none'}}>
            Product "{updatedProduct}" Updated Successfully!
        </div>
    )

    const errorMessage = () => (
        <div className="alert alert-danger mt-3" style={{ display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const productForm = () => (
        <form>
            {successMessage()}
            {errorMessage()}
            {getRedirect && <Redirect to="/admin/dashboard" />}
            <span>Post Photo</span>
            <div className="form-group">
                <label className="btn btn-success btn-block">
                    <input type="file" onChange={handleChange("photo")} name="photo" accept="image" placeholder="choose a file" />
                </label>
            </div>
            <div className="form-group">
                <input type="text" onChange={handleChange("name")} placeholder="Name" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <textarea name="desc" className="form-control" placeholder="Description" onChange={handleChange("desc")} value={desc} ></textarea>
            </div>
            <div className="form-row">
                <div className="form-group col-lg-4">
                    <input type="number" onChange={handleChange("price")} placeholder="Price" className="form-control" value={price} />
                </div>
                <div className="form-group col-lg-4">
                    <select onChange={handleChange("category")} className="form-control" placeholder="Category">
                        <option>Select</option>
                        { categories && categories.map((cate, idx) => (
                            <option key={idx} value={cate._id} selected={category === cate._id ? "selected" : null } >{cate.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-lg-4">
                    <input type="number" onChange={handleChange("stock")} placeholder="Quantity" className="form-control" value={stock} />
                </div>
            </div>
            <button type="submit" disabled={loading} onClick={handleSubmit} className="btn btn-outline-success">Create Product</button>
        </form>
    )

    return (
        <Base title="Add Products" description="Here, you can add new products" className="bg-info p-4 text-light">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-dark text-light rounded py-3">
                <div className="col-md-8 offset-md-2">
                    <h2>Update Product</h2>
                    {productForm()}
                </div>
            </div>            
        </Base>
    )
}

export default UpdateProduct
