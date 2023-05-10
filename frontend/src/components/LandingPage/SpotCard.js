import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots';

function SpotCard({ spot, update }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(spotActions.viewSpot(spot));
        history.push(`/spots/${spot.id}/edit`)

    }

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
                {update && (
                    <>
                        <button onClick={handleUpdate}>Update</button>
                        <button>Delete</button>
                    </>
                )}
            </NavLink>
        </div>
    );
}

export default SpotCard;