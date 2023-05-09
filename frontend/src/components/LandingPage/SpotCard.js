import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function SpotCard({ spot }) {
    if (!spot) return null;


    return (
        <div className='spot-card'>
            <NavLink to={`/spotDetails/${spot.id}`}>
                <div className='tooltip' data-tooltip={spot.name}>
                    <img src={spot.previewImage} alt='Image preview of home' className='card-img'></img>
                </div>
                <div className="rating-location">
                    <p className="card-location">{spot.city}, {spot.state}</p>
                    <p className="card-starRating">{spot.avgRating ? spot.avgRating : 'New'}</p>
                </div>
                <p className="card-price">{`$${spot.price} night`}</p>
            </NavLink>
        </div>
    );
}

export default SpotCard;