import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const curTab = (history, path) => {
    if(history.location.pathname === path){
        return { color: '#fff' };
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
                <Link className="nav-link" to="/" style={curTab(history, '/cart')}>Cart</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={curTab(history, '/user/dashboard')}>Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={curTab(history, '/admin/dashboard')}>A. Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={curTab(history, '/signin')}>Sign In</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={curTab(history, '/signup')}>Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={curTab(history, '/signout')}>Sign Up</Link>
            </li>
        </ul>
    </nav>
);

export default withRouter(Menu);
