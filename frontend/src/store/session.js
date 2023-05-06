import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const SET_SESSION = 'user/SET_SESSION';
const REMOVE_SESSION = 'user/REMOVE_SESSION'

//action creator to set user 
const setSession = (user) => {
    return {
        type: SET_SESSION,
        user
    };
};

//action creator to remove user
const removeSession = () => {
    return {
        type: REMOVE_SESSION
    }
}

//thunk login action creator
export const loginUser = (userCredentials) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(userCredentials)
    });



    const user = await res.json();

    dispatch(setSession(user));

    return user;

};

//thunk get session action creator
export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    const user = await res.json();

    dispatch(setSession(user));

    return res;
}

//thunk sign up user action creator
export const signUpUser = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });

    const data = await res.json();

    dispatch(setSession(data));

    return user;
}

// state object
const initialState = { user: null };

// reducer
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION:
            return { ...action.user };
        case REMOVE_SESSION:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;