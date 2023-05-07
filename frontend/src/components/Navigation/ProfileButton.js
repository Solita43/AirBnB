import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
    }



    return (
        <>
            <button className='user-icon' onClick={openMenu}>
                <i className="fa-solid fa-user"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.firstName} {user.lastName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout} className='logout'>Log Out</button>
                        </li>

                    </>
                ) : (
                    <>
                        <li>
                            <OpenModalButton buttonText='Log In' modalComponent={<LoginFormModal />} onButtonClick={closeMenu} />
                        </li>
                        <li>
                            <OpenModalButton buttonText='Sign Up' modalComponent={<SignupFormModal />} onButtonClick={closeMenu} />
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;