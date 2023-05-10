import { csrfFetch } from './csrf';

// constants to avoid debugging typos
const GET_SPOT_REVIEWS = 'reviews/GETSPOTREVIEWS';

// action creators:
export const listSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

//thunk action creators: 
export const getReviewsForSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();

    const reviews = {};
    for (let review of data.Reviews) {
        reviews[review.id] = review;
    }
    
    dispatch(listSpotReviews(reviews))
}


// state object
const initialState = {};

// reducer
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_REVIEWS: 
            return {...state, spot: {...action.reviews}}
        default:
            return state;
    }
};

export default reviewsReducer;