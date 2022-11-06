import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import OrderItem from './OrderItem';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            // for checking send the jwt token in headers
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                // check if the jwt sends any unauthorized access or forbidden, if yes we can simply logOut the user
                if (res.status === 401 || res.status === 403) {
                    logOut()
                        .then(result => { })
                        .catch(() => { })
                }
                return res.json()
            })
            .then(data => setOrders(data))
    }, [logOut, user?.email])

    const handleDeleteOrder = id => {
        const proceed = window.confirm('Are you sure, delete this service order?')
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const remainingOrders = orders.filter(order => order._id !== id)
                        setOrders(remainingOrders);
                    }
                })
        }
    }

    const handleUpdateOrder = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(order => order._id !== id);
                    const approved = orders.find(order => order._id === id);
                    approved.status = "Approved";
                    const newOrders = [approved, ...remaining];
                    setOrders(newOrders);
                }
            })
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => <OrderItem
                            key={order._id}
                            order={order}
                            handleDeleteOrder={handleDeleteOrder}
                            handleUpdateOrder={handleUpdateOrder}
                        ></OrderItem>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Orders;