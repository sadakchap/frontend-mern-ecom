import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';

const Signup = () => {
    return(
        <Base title="Sign Up Page" description="Join us in this amazing journey">
            <div className="row">
                <div className="col-md-6 col-sm-12 offset-3 px-5 py-4 text-left" style={formOuterStyle}>
                    <form>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" placeholder="John Doe" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" class="btn btn-success">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </Base>
    )
};


const formOuterStyle = { 
    boxShadow: '0 0 20px rgba(255,255, 255, .1), 10px 10px 30px rgba(255,255, 255, .1)',
    borderRadius: '10px'
}

export default Signup;