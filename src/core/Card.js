import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper'

const Card = ({ product, addToCart = true, removeFromCart = false, setReload = f => f, reload = undefined }) => {

    const [redirect, setRedirect] = useState(false);

    const getRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addToCart) => (
        addToCart && ( <button onClick={() => addItemToCart(product, () => setRedirect(true))} className="btn btn-block btn-outline-success mb-2">Add to Cart</button> )
    );

    const showRemoveFromCart = (removeFromCart) => (
        removeFromCart && ( <button onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload)
        }} className="btn btn-block btn-outline-danger mb-2">Remove from Cart</button> )
    );

    return (
        <div className="card text-white bg-dark border border-info">
            {getRedirect(redirect)}
            <div className="card-header lead">{ product.name }</div>
            <div className="card-body text-center">
                <ImageHelper productId={product._id} />
                <p className="lead small font-weight-normal text-wrap">{product.desc}</p>
                <p className="btn btn-success rounded btn-sm px-4">$ {product.price}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
