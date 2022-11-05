import React from 'react';
import { Link } from 'react-router-dom';

const ServiceItem = ({ service }) => {
    const { _id, img, title, price } = service;
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure className="px-2 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl h-48" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions">
                    <p className='text-orange-600 font-bold'>Price: ${price}</p>
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-outline btn-warning btn-xs">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceItem;