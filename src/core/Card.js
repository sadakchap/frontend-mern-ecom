import React from 'react'
import ImageHelper from './helper/ImageHelper'

const Card = ({ product, addToCart = true, removeFromCart = false }) => {

    const showAddToCart = (addToCart) => (
        addToCart && ( <button onClick={() => {}} className="btn btn-block btn-outline-success mb-2">Add to Cart</button> )
    );

    const showRemoveFromCart = (removeFromCart) => (
        removeFromCart && ( <button onClick={() => {}} className="btn btn-block btn-outline-danger mb-2">Remove from Cart</button> )
    );

    return (
        <div className="card text-white bg-dark border border-info">
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
