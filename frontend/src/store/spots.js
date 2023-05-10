import { csrfFetch } from './csrf';

// constants to avoid debugging typos
const GET_ALL_SPOTS = 'spots/GETALLSPOTS';
const GET_SPOT_DETAILS = 'spots/GETSPOTDETAILS';
const CREATE_NEW_SPOT = 'spots/CREATENEWSPOT';
const UPDATE_SPOT = 'spots/UPDATESPOT';
const GET_USERS_SPOTS = 'spots/GETUSERSSPOTS'



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
// Add new spot
export const addSpot = (spot) => {
    return {
        type: CREATE_NEW_SPOT,
        spot
    }
}

export const editSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
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

//get current users spots thunk
export const getCurrentSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
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

    
        dispatch(viewSpot(data));
    

    return data;
}

// Create new spot thunk
export const createSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    });

    const data = await res.json();

    dispatch(addSpot(data));
    return data;
}

// Update a spot thunk
export const updateSpot = (spotId, spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    });

    const data = await res.json();
    console.log('THIS IS THE UPDATED SPOT PASSING TO STORE', data)
    dispatch(editSpot(data));

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
            return { ...state, allSpots: {...state.allSpots}, singleSpot: {...action.spot} };
        case CREATE_NEW_SPOT:
            return {...state, allSpots: {...state.allSpots, [action.spot.id]: action.spot}};
        case UPDATE_SPOT:
            return {...state, allSpots: {...state.allSpots, [action.spot.id]: action.spot}, singleSpot: {...state.singleSpot}}
        default:
            return state;
    }
};

export default spotsReducer;