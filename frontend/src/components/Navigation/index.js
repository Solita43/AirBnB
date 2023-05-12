import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateNewSpotButton from "./CreateNewSpotButton";
import logo from './Logo.jpg'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="header">
      <li id='home'>
        <NavLink exact to="/">
          <div id='logo'>
            <img src={logo} alt='logo' id='logo_img'></img>
            <h1 id='logo-text'>atrixbnb</h1>
          </div>
        </NavLink>
      </li>
        <CreateNewSpotButton sessionUser={sessionUser} />
      {isLoaded && (
        <li className={sessionUser ? 'profile-menu': 'profile-menu logged-out'}>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;