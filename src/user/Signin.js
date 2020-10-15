import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, isAuthenticated, authenticate } from '../auth/helper';
import Base from '../core/Base';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        didRedirect: false
    });

    const handleChange = name => e => setValues({ ...values, [name]: e.target.value });
    
    const { email, password, error, loading, didRedirect } = values;
    const user = isAuthenticated();

    const onSubmit = e => {
        e.preventDefault();
        console.log(`on submit`);
        setValues({ ...values, error: false, loading: true});
        signin({ email, password })
        .then(data => {
            if(data.error){
                setValues({ ...values, error: data.error, loading: false});
            }else{
                authenticate(data, () => {
                    setValues({ ...values, error: false, loading: false, didRedirect: true});
                });
            }
        })
        .catch(err => console.log(`sign in request failed ${err}`))
    };

    const performRedirect = () => {
        // TODO: redirect correctly
        if(didRedirect){
            if(user && user.role === 1){
                return <p>redirect to admin dashboard</p>
            }else{
                return <p>redirect to user dashboard</p>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
      return(
        loading && (
            <div className="alert alert-info">
                <span className="small">Loading...</span>
            </div>
        )
      )
    };

    const errorMessage = () => {
      const fields = Array.isArray(error) ? error.map( err => `${err.name}`) : '';
      return(
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
          { fields ? `${fields.join(', ')} are required` : error }
        </div>
      )
    };

    const signInForm = () => (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={handleChange("email")} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={handleChange("password")} />
            </div>
            <div className="form-group text-center">
                <button type="submit" className="btn btn-success">Sign In</button>
            </div>
        </form>
    )

    return(
        <Base title="Welcome back" description="We are glad to have you back!">
            <div className="row">
                <div className="col-md-6 col-sm-12  offset-md-3 offset-sm-0 px-5 py-5 text-left" style={formOuterStyle}>
                    {errorMessage()}
                    {loadingMessage()}
                    {signInForm()}
                    {performRedirect()}
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