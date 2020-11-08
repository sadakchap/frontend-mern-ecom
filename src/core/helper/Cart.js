import React, { useState, useEffect } from 'react';
import Base from '../Base';
import Card from '../Card';
import { loadCart } from './cartHelper';


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <>
                <h2>Load all products</h2>
                <div className="row">
                    {products && products.map((prod, idx) => (
                        <div className="col-lg-6 col-md-12 mb-3" key={idx}>
                                <Card product={prod} addToCart={false} removeFromCart={true} setReload={setReload} reload={reload} />
                        </div>
                    ))}
                </div>

            </>
        )
    };

    const loadCheckout = () => {
        return (
            <h4>This is checkout section</h4>
        )
    }

    return (
        <Base title="Your Cart" description="See all of your products which you are going to buy!">
            <div className="row">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
};

export default Cart;