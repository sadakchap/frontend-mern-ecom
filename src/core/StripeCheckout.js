import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { STRIPE_KEY } from '../backend';


const StripeCheckout = ({ products, setReload = f => f, reload=undefined }) => {
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: ''
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const user = isAuthenticated() && isAuthenticated().user._id;
     
    const getTotalAmount = () => {
        let amount = 0;
        for (let idx = 0; idx < products.length; idx++) {
            amount += products[idx].price
        }
        return amount;
    }

    const makePayment = token => {
        console.log(token);
    }

    const showButton = () => (
        isAuthenticated() ? (
            <StripeCheckoutButton stripeKey={STRIPE_KEY} token={makePayment} name={`Make payment`} amount={getTotalAmount() * 100} >
                <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin" className="btn btn-warning btn-sm">Sign in</Link>
        )
    )

    return (
        <div className="text-center">
            Stripe Checkout $<strong className="text-info"> {getTotalAmount()}</strong>
            <div className="mt-4">
                {showButton()}
            </div>
        </div>
    )
}

export default StripeCheckout
