import { csrfFetch } from './csrf';

// constants to avoid debugging typos
const GET_ALL_SPOTS = 'spots/GETALLSPOTS';


// action creators:


//thunk login action creators: 


// state object
const initialState = { allSpots: {} };

// reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default spotsReducer;