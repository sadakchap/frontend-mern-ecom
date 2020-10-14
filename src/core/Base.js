import React from 'react';


// Use PropTypes and define default prop values differently
const Base = ({ title="My Title", description=undefined, className="bg-dark text-white p-4", children}) => {
    return (
        <div className="">
            <div className="container-fluid" style={{ minHeight: '100vh'}}>
                <div className="jumbotron bg-dark text-white text-center mb-0">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>

            <footer className="footer bg-dark mt-auto py-3 d-flex justify-space-between">
                <div className="container-fluid bg-dark text-light">
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
