import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from "../DeleteSpotModal";

function SpotCard({ spot, update }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleUpdate = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(spotActions.viewSpot(spot));
        history.push(`/spots/${spot.id}/edit`)

    }

    const spotDetails = () => {
        history.push(`/spotDetails/${spot.id}`)
    }

    if (!spot) return null;

    const rating = spot.avgRating ? spot.avgRating.toFixed(2) : 'New';

    return (
        <div className='spot-card'>
            <div className="main_card" onClick={spotDetails}>
                <div className='tooltip' data-tooltip={spot.name}>
                    <img src={spot.previewImage} alt='' className='card-img'></img>
                </div>

                <div className="spot_card_info">
                    <div className="rating-location">
                        <p className="card-location">{spot.city}, {spot.state}</p>
                        <div id='rating_card'>
                            <i className="fa-solid fa-star" style={{ color: '#0f0000' }}></i>
                            <p className="card-starRating">{rating}</p>
                        </div>
                    </div>
                    <p className="card-price"><span className='bold'>${spot.price.toFixed(2)}</span> night</p>
                </div>
            {update && (
                <div id='update_delete_spot'>
                    <button onClick={handleUpdate} className="manage_update">Update</button>
                    <OpenModalButton modalComponent={<DeleteSpotModal spotId={spot.id} />} buttonText='Delete' addClass='manage_delete'/>
                </div>
            )}
            </div>
        </div>
    );
}

export default SpotCard;