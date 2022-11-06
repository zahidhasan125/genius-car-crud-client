import React, { useEffect, useState } from 'react';
import ServiceItem from './ServiceItem';

const Services = () => {

    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://genius-car-server-woad.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div>
            <div className='text-center w-2/3 mx-auto'>
                <p className="text-orange-600 text-xl font-bold">Services</p>
                <h2 className='text-5xl font-semibold'>Our Service Area</h2>
                <p className='py-5'>The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                {
                    services.map(service => <ServiceItem key={service._id} service={service}></ServiceItem>)
                }
            </div>
        </div>
    );
};

export default Services;