import { csrfFetch } from './csrf';

// constants to avoid debugging typos
const GET_ALL_SPOTS = 'spots/GETALLSPOTS';


// action creators:

//Get list of alll spots
export const listSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
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


// state object
const initialState = { allSpots: {} };

// reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: 
            return {...state, allSpots: {...action.spots}}
        default:
            return state;
    }
};

export default spotsReducer;