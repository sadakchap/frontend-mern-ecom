import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'

const ManageCategories = () => {
    return (
        <Base title="Manage Categories" description="Update, read, remove Categories here!" className="bg-light p-5">
            Hi, lets manage Categories
            <Link to="/admin/dashboard" className="d-block btn btn-outline-info">Back</Link>
        </Base>
    )
}

export default ManageCategories
