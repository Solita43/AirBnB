import { csrfFetch } from './csrf';

// constants to avoid debugging typos
const GET_ALL_SPOTS = 'spots/GETALLSPOTS';
const GET_SPOT_DETAILS = 'spots/GETSPOTDETAILS'


// action creators:

//Get list of all spots
export const listSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

// View details for one spot
export const viewSpot = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}


//thunk login action creators: 

//get list of all spots thunk
export const getAllSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    const data = await res.json();

    const spots = {};
    data.Spots.forEach(spot => {
        spots[spot.id] = spot;
    });

    dispatch(listSpots(spots));

}

//Get details for one spot thunk
export const getSpotDetails = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);
    const data = await res.json();

    if (res.ok) {
        dispatch(viewSpot(data));
    } 

    return data;
}


// state object
const initialState = { allSpots: {} };

// reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: 
            return {...state, allSpots: {...action.spots}};
        case GET_SPOT_DETAILS:
            return { ...state, allSpots: {...state.allSpots}, singleSpot: {...action.spot} }
        default:
            return state;
    }
};

export default spotsReducer;