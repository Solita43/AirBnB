import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots';
import './SpotDetailsPage.css';
import { getReviewsForSpot } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import PostReviewModal from '../PostReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';


function SpotDetailsPage() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviews = reviewsObj ? Object.values(reviewsObj) : null;


    useEffect(() => {

        dispatch(spotsActions.getSpotDetails(spotId));
        dispatch(getReviewsForSpot(spotId))

    }, [dispatch, spotId])

    const handleClick = (e) => {
        e.preventDefault();
        window.alert('Feature coming soon...');

    }

    if (!spot || !spot.SpotImages || !reviewsObj) return null;

    const spotImageArr = spot.SpotImages;
    const previewImage = spotImageArr.find((image) => image.preview);
    const images = spotImageArr.filter(image => !image.preview);

    let reviewCount;
    if (spot.numReviews === 1) {
        reviewCount = `${spot.numReviews} review`
    } else if (spot.numReviews > 1) {
        reviewCount = `${spot.numReviews} reviews`
    }

    reviews?.sort((revA, revB) => -1 * (Date.parse(revA.updatedAt) - Date.parse(revB.updatedAt)));

    const getDate = (date) => {
        const obj = new Date(date);
        const month = obj.toDateString().split(' ')[1]
        const year = obj.getFullYear();
        return `${month}, ${year}`;
    }

    const rating = spot.avgStarRating ? +spot.avgStarRating.toFixed(2) : 'New';

    return (
        <div id='spot-details'>
            <h1>{spot.name}</h1>
            <p id='city_detail'>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
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
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p id='details_description'>{spot.description}</p>
                </div>
                <div id='callout'>
                    <div id='callout_info'>
                        <h3>${+spot.price.toFixed(2)}</h3><p id='callout_night'> night</p>
                        <p className='callout_review'><i id='callout_star' className="fa-solid fa-star"></i>{rating}   {reviewCount && (<><i id='callout_dot' className="fa-solid fa-circle" style={{ fontSize: '3px' }}></i> {reviewCount}</>)}</p>
                    </div>
                    <button id='reserve' onClick={handleClick}>Reserve</button>
                </div>
            </div>
            <div id='details-reviews'>
                <i className="fa-solid fa-star" id='details_star'></i>
                <h3> {rating}</h3>
                {reviewCount && (
                    <>
                        <i className="fa-solid fa-circle" id='details_dot' style={{ fontSize: '3px' }}></i>
                        <h3>{reviewCount}</h3>
                    </>
                )}
            </div>
            {sessionUser && reviews && !reviews.find(review => review.userId === sessionUser.id) && sessionUser.id !== spot.ownerId && (
                <OpenModalButton addClass='details_post' modalComponent={<PostReviewModal spotId={spot.id} />} buttonText='Post Your Review' />
            )}
            <div id='reviews'>
                {reviews && reviews.map(review => {
                    return (
                        <div className='review' key={`${review.id}`}>
                            <h4>{review.User.firstName}</h4>
                            <p id='review_date'>{getDate(review.updatedAt)}</p>
                            <p id='posted_review'>{review.review}</p>
                            {sessionUser && review.userId === sessionUser.id && (
                                <OpenModalButton addClass='review_delete' modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />} buttonText='Delete' />
                            )}
                        </div>
                    )
                })}
                {reviews && !reviews.length && sessionUser && sessionUser.id !== spot.ownerId ? (<p>Be the first to post a review!</p>) : null}
            </div>
        </div>
    );
}

export default SpotDetailsPage;