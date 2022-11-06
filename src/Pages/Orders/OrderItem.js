import React, { useEffect, useState } from 'react';

const OrderItem = ({ order, handleDeleteOrder, handleUpdateOrder }) => {
    const { _id, service, customer, phone, serviceName, price, status } = order;
    const [selectedService, setSelectedService] = useState({});

    useEffect(() => {
        fetch(`https://genius-car-server-woad.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setSelectedService(data))
    }, [service])
    return (
        <tr>
            <th>
                <button onClick={() => handleDeleteOrder(_id)} className="btn btn-circle btn-sm btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask rounded w-20 h-20">
                            {
                                selectedService?.img && <img src={selectedService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">Price: ${price}</span>
            </td>
            <td className='w-12'>Purple</td>
            <th>
                <button onClick={() => handleUpdateOrder(_id)} className={status ? "btn btn-success btn-xs" : "btn btn-warning btn-xs"}>{status ? status : "Pending"}</button>
            </th>
        </tr>
    );
};

export default OrderItem;