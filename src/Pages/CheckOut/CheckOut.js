import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const CheckOut = () => {
    const { user } = useContext(AuthContext);
    const { _id, title, price } = useLoaderData();


    const handleOrders = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = form.email.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }
        fetch('https://genius-car-server-woad.vercel.app/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    form.reset()
                    alert('Order successfully placed')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="hero">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className='text-center'>
                        <h2 className="text-5xl font-bold">{title}</h2>
                        <p className="text-xl font-semibold">Price: {price}</p>
                    </div>
                    <form onSubmit={handleOrders} className="card-body w-full">
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input type="text" name='firstName' placeholder="First Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input type="text" name='lastName' placeholder="Last Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="text" name='phone' placeholder="Phone" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="Email address" className="input input-bordered" defaultValue={user?.email} readOnly />
                            </div>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Your Message</span>
                            </label>
                            <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your message here" required></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <input type='submit' className="btn btn-primary" value="Place Order" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;