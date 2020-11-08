import React, { useState, useEffect } from 'react';
import { getProducts } from '../admin/helper/adminapicall';
import '../styles.css';
import Base from './Base';
import Card from './Card';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
                setError(data.error);
            }else{
                setProducts(data);
            }
        }).catch(err => {
            console.log(err);
            setError(err.response.data.error)
        })
    }, []);

    return (
        <Base title="Home Page">
            <div className="row">
                {products && products.map((prod, idx) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={idx}>
                        <Card product={prod} />
                    </div>
                ))}
            </div>
        </Base>
    )
};

export default Home;