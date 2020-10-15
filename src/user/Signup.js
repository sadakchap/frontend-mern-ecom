import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { signup } from '../auth/helper/index';

const Signup = () => {

    const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      error: '',
      success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = e => {
      setValues({ ...values, error: false, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
      e.preventDefault();
      setValues({ ...values, error: false});
      signup({ email, name, password })
      .then(data => {
        if(data.error){
          setValues({ ...values, error: data.error, success: false});
        }else{
          setValues({ ...values, name: '', email: '', password: '', error: false, success: true });
        }
      })
      .catch(err => console.log(`Error is sign up ${err.message}`))
    };

    const successMessage = () => {
      return(
        <div className="alert alert-success" style={{ display: success ? "" : "none"}}>
          New account was created!. Please Login <Link to="/signin">Here</Link>
        </div>
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

    return(
      <Base title="Sign Up Page" description="Join us in this amazing journey">
        <div className="row">
          <div className="col-md-6 col-sm-12 offset-md-3 offset-sm-0 px-5 py-4 text-left" style={formOuterStyle}>
            <form onSubmit={onSubmit}>
              { success && successMessage() }
              { error && errorMessage() }
              <div className="form-group">
                <label>Email address</label>
                <input type="email" name="email" className="form-control" placeholder="Enter email" value={email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" placeholder="John Doe" value={name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={handleChange} />
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-success">Sign Up</button>
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