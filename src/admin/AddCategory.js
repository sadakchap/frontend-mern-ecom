import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const onSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        createCategory(user._id, token, { name })
        .then(data => {
            if(data.error){
                setError(true);
                setSuccess(false);
            }else{
                setError(false);
                setSuccess(true);
                setName("");
            }
        })
        .catch(err => console.log('error while making add category'))
    }

    const successMessage = () => (
         success && (
            <h4 className="text-success small">Category created Successfully</h4>
        )
    )

    const errorMessage = () => (
        error && (
            <h4 className="text-danger small">Sorry, something went wrong!</h4>         
        )
    )

    const categoryForm = () => (
        <form className="my-3" onSubmit={onSubmit}>
            <div className="form-group">
                <label>Enter Category name here.</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" autoFocus required placeholder="E.g. Summer" />
                {successMessage()}
                {errorMessage()}
            </div>
            <button type="submit" className="btn btn-outline-info rounded px-5">Add</button>
        </form>
    )

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-secondary mb-3" to="/admin/dashboard">back</Link>
        </div>
    )

    return (
        <Base title="Add new Category" description="Add new category for watches" className="container bg-info p-4">
            <div className="row bg-light rounded">
                <div className="col-md-8 offset-md-2">
                    
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
