import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import AdminRoute from './auth/helper/AdminRoute';
import PrivateRoute from './auth/helper/PrivateRoute';
import Home from './core/Home';
import AdminDashBoard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/create/products" exact component={AddProduct} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;