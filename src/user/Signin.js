import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';

const Signin = () => {
    return(
        <Base title="Welcome back" description="We are glad to have you back!">
            <div className="row">
                <div className="col-md-6 col-sm-12 offset-3 px-5 py-5 text-left" style={formOuterStyle}>
                    <form>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" class="btn btn-success">Sign In</button>
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

export default Signin;