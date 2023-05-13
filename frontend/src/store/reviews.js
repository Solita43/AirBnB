import { csrfFetch } from './csrf';
import { getSpotDetails } from './spots';

// constants to avoid debugging typos
const GET_SPOT_REVIEWS = 'reviews/GETSPOTREVIEWS';
const DELETE_REVIEW = 'reviews/DELETEREVIEW';

// action creators:

// List all reviews for current spot
export const listSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

// Delete a Review
export const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//thunk action creators: 

// Get all reviews for spot thunk
export const getReviewsForSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();

    const reviews = {};
    for (let review of data.Reviews) {
        reviews[review.id] = review;
    }
    
    dispatch(listSpotReviews(reviews))
}

// Post a review thunk
export const postReview = (spotId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });

    dispatch(getReviewsForSpot(spotId))
    dispatch(getSpotDetails(spotId))

}

// Delete a review thunk
export const deleteReview = (reviewId, spotId, closeModal) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const data = await res.json();

    dispatch(removeReview(reviewId))
    dispatch(getSpotDetails(spotId))
}



// state object
const initialState = {};

// reducer
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_REVIEWS: 
            return {...state, spot: {...action.reviews}};
        case DELETE_REVIEW:
            const newState = {...state, spot: {...state.spot}};
            delete newState.spot[action.reviewId];
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;