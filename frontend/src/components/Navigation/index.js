import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    }

    return (
        <ul className="nav">
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            {!sessionUser && isLoaded && (
                <li>
                    <NavLink exact to='/login'>Log In</NavLink>
                    <NavLink exact to='/signup'>Sign Up</NavLink>
                </li>
            )}
            {sessionUser && isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                    <button onClick={logout}>Log Out</button>
                </li>
            )}
        </ul>
    );
}

export default Navigation;