import React from 'react';
import './BannerItem.css';

const BannerItem = ({ slide }) => {
    const { image, id, next, prev } = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='slider-image'>
                <img src={image} className="w-full rounded-2xl" alt='' />
            </div>
            <div className="ml-6 text-white absolute flex justify-start transform -translate-y-1/2 left-24 right-5 top-1/4">
                <h1 className='text-6xl font-bold'>
                    Affordable <br />
                    Price For Car <br />
                    Servicing
                </h1>
            </div>
            <div className="ml-6 text-white absolute flex justify-start transform -translate-y-1/2 left-24 right-5 top-2/4">
                <p className='w-2/5'>
                    There are many variations of passages of  available, but the majority have suffered alteration in some form
                </p>
            </div>
            <div className="ml-6 text-white absolute flex justify-start transform -translate-y-1/2 left-24 right-5 top-3/4">
                <button className="btn btn-warning mr-5">Discover More</button>
                <button className="btn btn-outline btn-warning">Latest Project</button>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;