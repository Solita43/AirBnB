import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();


    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
        closeMenu();
        history.push('/')

    }

    const manageClick = (e) => {
        e.preventDefault();
        closeMenu();
        history.push('/spots/current');
    }



    return (
        <>
            <button className='menu-button' onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-circle-user"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <div id='user_dropdown'>
                        <div id="user_dropdown_info">
                            <li>Hello, {user.firstName}</li>
                            <li>{user.email}</li>
                        </div>
                        <li id='user_dropdown_manageSpots' onClick={manageClick}>
                            Manage Spots
                        </li>
                        <li>
                            <button onClick={logout} className='logout'>Log Out</button>
                        </li>

                    </div>
                ) : (
                    <>
                        <OpenModalMenuItem itemText='Sign Up' modalComponent={<SignupFormModal />} onItemClick={closeMenu} signup='sign-up-item' />
                        <OpenModalMenuItem itemText='Log In' modalComponent={<LoginFormModal />} onItemClick={closeMenu} />

                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;