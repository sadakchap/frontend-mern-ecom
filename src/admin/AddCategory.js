import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const categoryForm = () => (
        <form className="my-3">
            <div className="form-group">
                <label>Enter Category name here.</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" autoFocus required placeholder="E.g. Summer" />
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
