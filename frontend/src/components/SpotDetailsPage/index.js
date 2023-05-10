import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots';
import './SpotDetailsPage.css';

function SpotDetailsPage() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);


    useEffect(() => {

        dispatch(spotsActions.getSpotDetails(spotId));

    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        window.alert('Feature coming soon...');

    }

    if (!spot || !spot.SpotImages) return null;
   
    const spotImageArr = spot.SpotImages;
    const previewImage = spotImageArr.find((image) => image.preview);
    const images = spotImageArr.filter(image => !image.preview);   




    return (
        <div id='spot-details'>
            <h1>{spot.name}</h1>
            <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
            <div id='spot-images'>
                <img src={previewImage.url} alt='Preview Image' id='previewImg'></img>
                <div id='smaller-images'>
                    {images.map((image, idx) => {
                        if (idx < 4) return (<img src={image.url} key={image.id} className='detail-images'></img>)
                    })}
                </div>
            </div>
            <div id='description-callout'>
                <div id='name-description'>
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                </div>
                <div id='callout'>
                    <h3>${spot.price} night</h3>
                    <h4>{spot.avgStarRating ? spot.avgStarRating: 'New'}</h4>
                    <button id='reserve' onClick={handleClick}>Reserve</button>
                </div>
            </div>
        </div>
    );
}

export default SpotDetailsPage;