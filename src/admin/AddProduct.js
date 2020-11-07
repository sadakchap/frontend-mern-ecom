import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { createProduct, getCategories } from './helper/adminapicall';

const AddProduct = () => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: '',
        desc: '',
        price: '',
        stock: '',
        photo: '',
        categories: '',
        category: '',
        loading: false,
        error: '',
        createdProduct: '',
        getRedirect: false,
        formData: ''
    });

    const { name, desc, price, stock, categories, loading, error, createdProduct, getRedirect, formData } = values;

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };
    
    

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, error: "", loading: true });
        createProduct(user._id, token, formData).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error });
            }else{
                setValues({
                    ...values,
                    name: '',
                    desc: '',
                    price: '',
                    stock: '',
                    file: '',
                    category: '',
                    createdProduct: data.name,
                    loading: true
                });
                setTimeout(() => {
                    setValues({ ...values, getRedirect: true})
                }, 2000);
            }
        })
    }
    
    const preload = () => {
        getCategories().then(data => {
            console.log(data);
            if(data.error){
                setValues({ ...values, error: data.error })
            }else{
                setValues({ ...values, categories: data, formData: new FormData() });
                console.log("Categories -> ", categories);
            }
        }).catch(err => {
            console.log(err);
            setValues({ ...values, error: err.response.data.error})
        })
    }

    useEffect(() => {
        preload();
        // eslint-disable-next-line
    }, []);

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: createdProduct ? '' : 'none'}}>
            Product "{createdProduct}" created Successfully!
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
                    <input type="number" onChange={handleChange("price")} placeholder="Price" className="form-control" value={price} placeholder="Price" />
                </div>
                <div className="form-group col-lg-4">
                    <select onChange={handleChange("category")} className="form-control" placeholder="Category">
                        <option>Select</option>
                        { categories && categories.map((cate, idx) => (
                            <option key={idx} value={cate._id}>{cate.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-lg-4">
                    <input type="number" onChange={handleChange("stock")} placeholder="Quantity" className="form-control" value={stock} placeholder="Quantity" />
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
                    <h2>Create Products</h2>
                    {productForm()}
                </div>
            </div>            
        </Base>
    )
}

export default AddProduct
