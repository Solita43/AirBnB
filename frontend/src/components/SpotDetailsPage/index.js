import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots';
import './SpotDetailsPage.css';
import { getReviewsForSpot } from '../../store/reviews';

import ReviewList from './ReviewList';

function SpotDetailsPage() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviews = reviewsObj ? Object.values(reviewsObj) : null;


    useEffect(() => {

        dispatch(spotsActions.getSpotDetails(spotId));
        dispatch(getReviewsForSpot(spotId))

    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        window.alert('Feature coming soon...');

    }

    if (!spot || !spot.SpotImages) return null;

    const spotImageArr = spot.SpotImages;
    const previewImage = spotImageArr.find((image) => image.preview);
    const images = spotImageArr.filter(image => !image.preview);

    let reviewCount;
    if (spot.numReviews === 1) {
        reviewCount = `${spot.numReviews} Review`
    } else if (spot.numReviews > 1) {
        reviewCount = `${spot.numReviews} Reviews`
    }

   

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
                    <p><i className="fa-solid fa-star"></i>{spot.avgStarRating ? spot.avgStarRating : 'New'}   {reviewCount && (<><i className="fa-solid fa-circle" style={{ fontSize: '3px' }}></i> {reviewCount}</>)}</p>
                    <button id='reserve' onClick={handleClick}>Reserve</button>
                </div>
            </div>
            <div id='details-reviews'>
                <h3><i className="fa-solid fa-star"></i> {spot.avgStarRating ? spot.avgStarRating : 'New'} {reviewCount && (<><i className="fa-solid fa-circle" style={{ fontSize: '3px' }}></i> {reviewCount}</>)}</h3>
            </div>
            <ReviewList reviews={reviews} spot={spot} />
        </div>
    );
}

export default SpotDetailsPage;