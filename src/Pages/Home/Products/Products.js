import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
        .then(data=>setProducts(data))
    },[])
    return (
        <div>
            <div className='text-center w-2/3 mx-auto'>
                <p className="text-orange-600 text-xl font-bold">Popular Products</p>
                <h2 className='text-5xl font-semibold'>Browse Our Products</h2>
                <p className='py-5'>The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            {
                products.map(prd=><ProductItem key={prd._id} product={prd}></ProductItem>)
            }
            </div>
        </div>
    );
};

export default Products;