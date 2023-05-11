import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import PostReviewModal from '../PostReviewModal';

function ReviewList({ reviews, spot }) {
    const sessionUser = useSelector(state => state.session.user);

    if (!reviews) return null;

    reviews.sort((revA, revB) => -1 * (Date.parse(revA.updatedAt) - Date.parse(revB.updatedAt)));

    const getDate = (date) => {
        const obj = new Date(date);
        const month = obj.toDateString().split(' ')[1]
        const year = obj.getFullYear();
        return `${month}, ${year}`;
    }


    return (
        <div id='reviews'>
            {sessionUser && reviews && !reviews.find(review => review.userId === sessionUser.id) && sessionUser.id !== spot.ownerId && (
                <OpenModalButton modalComponent={<PostReviewModal spotId={spot.id} />} buttonText='Post Your Review'  />
            )}
            {reviews && reviews.map(review => {
                return (
                    <div className='review' key={`${review.id}`}>
                        <h5>{review.User.firstName}</h5>
                        <p>{getDate(review.updatedAt)}</p>
                        <p>{review.review}</p>
                    </div>
                )
            })}
            {!reviews.length && sessionUser && sessionUser.id !== spot.ownerId ? (<p>Be the first to post a review!</p>) : null}
        </div>
    );
}

export default ReviewList;