import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    

    return (
        <ul className="nav">
            <li>
                <NavLink exact to='/' >Home</NavLink>
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
                </li>
            )}
        </ul>
    );
}

export default Navigation;