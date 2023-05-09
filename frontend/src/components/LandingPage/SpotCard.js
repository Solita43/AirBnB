import React from "react";

function SpotCard({ spot }) {
    if (!spot) return null;

    console.log(spot)

    return (
        <div className='spot-card'>
            <div className='tooltip' data-tooltip={spot.name}>
                <img src={spot.previewImage} alt='Image preview of home' className='card-img' title={`${spot.name}`}></img>
            </div>
            <div className="rating-location">
                <p className="card-location">{spot.city}, {spot.state}</p>
                <p className="card-starRating">{spot.avgRating ? spot.avgRating : 'New'}</p>
            </div>
            <p className="card-price">{`$${spot.price} night`}</p>
        </div>
    );
}

export default SpotCard;