import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';

const curTab = (history, path) => {
    if(history.location.pathname === path){
        return { color: '#12c549' };
    }else{
        return { color: '#aaa' };
    }
}

const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ maxHeight: '80px'}}>
        <a className="navbar-brand" href="/">Watches</a>

        <ul className="nav nav-tabs ml-auto" style={{ display: 'flex', flexDirection: 'row'}}>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={curTab(history, '/')}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cart" style={curTab(history, '/cart')}>Cart</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/user/dashboard" style={curTab(history, '/user/dashboard')}>Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard" style={curTab(history, '/admin/dashboard')}>A. Dashboard</Link>
            </li>


            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={curTab(history, '/signin')}>Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={curTab(history, '/signup')}>Sign Up</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick={() => {
                        signout(() => {
                            history.push('/signin')
                        });
                    }}>Sign Out</span>
                </li>    
            )}
        </ul>
    </nav>
);

export default withRouter(Menu);
