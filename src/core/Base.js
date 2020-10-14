import React from 'react';
import Menu from './Menu';

// Use PropTypes and define default prop values differently
const Base = ({ title="My Title", description=undefined, className="bg-dark text-white p-4", children}) => {
    return (
        <div className="">
            <Menu />
            <div className="container-fluid" style={{ minHeight: 'calc(100vh - 80px)'}}>
                <div className="jumbotron bg-dark text-white text-center mb-0">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead small">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>

            <footer className="footer mt-5 py-5 d-flex justify-space-between" style={{ backgroundColor: '#262626'}}>
                <div className="container-fluid text-light">
                    <p className="small m-0 d-inline">If you got any questions feel free to reack out</p>
                </div>
                <div className="container text-right">
                    <span className="text-muted">Amazing Watches</span>
                </div>
            </footer>

        </div>
    )
}

export default Base
