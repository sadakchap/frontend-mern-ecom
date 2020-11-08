import React from 'react'
import { API } from '../../backend'

const ImageHelper = ({ productId }) => {
    const imageUrl  = productId ? `${API}/product/photo/${productId}` : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    return (
        <div className="rounded border border-success p-2 mb-2">
            <img src={imageUrl} alt="product" style={{ maxHeight: "100%", maxWidth: "100%" }} className="mb-3 rounded" />
        </div>
    )
}

export default ImageHelper
