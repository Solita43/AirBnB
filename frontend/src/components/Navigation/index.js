import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateNewSpotButton from "./CreateNewSpotButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="header">
      <li id='home'>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {sessionUser && (
        <CreateNewSpotButton />
      )}
      {isLoaded && (
        <li className='profile-menu'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;