import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Base from '../core/Base'

const AddProduct = () => {

    const [formData, setFormData] = useState({
        file: null,
        name: '',
        desc: '',
        price: '',
        stock: '',
    });

    const handleChange = name => e => setFormData({...FormData, [name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        console.log('submitting form!');
    }

    const { name, desc, price, stock } = formData;

    const productForm = () => (
        <form>
            <span>Post Photo</span>
            <div className="form-group">
                <label className="btn btn-success btn-block">
                    <input type="file" onChange={handleChange("file")} name="photo" accept="image" placeholder="choose a file" />
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
                        <option value="a">A</option>
                        <option value="b">B</option>
                    </select>
                </div>
                <div className="form-group col-lg-4">
                    <input type="number" onChange={handleChange("stock")} placeholder="Quantity" className="form-control" value={stock} placeholder="Quantity" />
                </div>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">Create Product</button>
        </form>
    )

    return (
        <Base title="Add Products" description="Here, you can add new products" className="bg-info p-4 text-light">
            <Link to="/admn/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
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
