import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    }

    return (
        <div  className='menu-profile'>
            <button className='user-icon'>
                <i class="fa-solid fa-user"></i>
            </button>
            <ul className="profile-dropdown">
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout} className='logout'>Log Out</button>
                </li>
            </ul>

        </div>

    );
}

export default ProfileButton;