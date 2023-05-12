import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from "../DeleteSpotModal";

function SpotCard({ spot, update }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(spotActions.viewSpot(spot));
        history.push(`/spots/${spot.id}/edit`)

    }

    if (!spot) return null;

    const rating = spot.avgRating? spot.avgRating.toFixed(2) : 'New';

    return (
        <div className='spot-card'>
            <NavLink to={`/spotDetails/${spot.id}`}>
                <div className='tooltip img' data-tooltip={spot.name} style={{backgroundImage: `url(${spot.previewImage})`}}>
                    {/* <img src={spot.previewImage} alt='Image preview of home' className='card-img'></img> */}
                </div>
                <div className="rating-location">
                    <p className="card-location">{spot.city}, {spot.state}</p>
                    <p className="card-starRating"><i className="fa-solid fa-star" style={{color: '#0f0000'}}></i>{rating}</p>
                </div>
                <p className="card-price">{`$${spot.price} night`}</p>
            </NavLink>
            {update && (
                <>
                    <button onClick={handleUpdate}>Update</button>
                    <OpenModalButton modalComponent={<DeleteSpotModal spotId={spot.id}/>} buttonText='Delete' />
                </>
            )}
        </div>
    );
}

export default SpotCard;