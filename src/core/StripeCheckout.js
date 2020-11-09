import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty } from './helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API, STRIPE_KEY } from '../backend';
import { createOrder } from './helper/orderHelper';


const StripeCheckout = ({ products, setReload = f => f, reload=undefined }) => {
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: ''
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
     
    const getTotalAmount = () => {
        let amount = 0;
        for (let idx = 0; idx < products.length; idx++) {
            amount += products[idx].price
        }
        return amount;
    }

    const makePayment = _token => {
        const body = {
            token: _token, products
        };
        const headers = {
            "Content-Type": "application/json"
        };

        setData({ ...data, loading: true });
        return fetch(`${API}/payment/stripe`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json()).then(result => {
            console.log(result);
            const orderData = {
                products: products,
                transaction_id: result.id,
                amount: result.amount
            }

            createOrder(userId, token, orderData);
            
            cartEmpty(() => {
                setReload(!reload);
                setData({ ...data, loading: false, success: true });
            });
        }).catch(err => {
            console.log(err);
            setData({ ...data, loading: false, success: false, error: 'something went wrong!' });
        })
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
