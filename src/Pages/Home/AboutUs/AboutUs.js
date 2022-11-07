import React from 'react';
import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';


const AboutUs = () => {
    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row">
                <div className='relative w-1/2'>
                    <img src={person} alt='' className="max-w-sm w-4/5 h-full rounded-lg shadow-2xl" />
                    <img src={parts} alt='' className="absolute right-5 border-8 top-1/2 max-w-sm w-3/5 rounded-lg shadow-2xl" />
                </div>
                <div className="text-center lg:text-left w-1/2">
                    <p className="text-orange-600 font-bold">About Us</p>
                    <h1 className="text-5xl font-bold w-4/5">We are qualified & of experience in this field</h1>
                    <p className="pt-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomized words which don't look even slightly believable. </p>
                    <p className="py-6">The majority have suffered alteration in some form, by injected humour, or randomized words which don't look even slightly believable.</p>
                    <button className="btn btn-warning">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;