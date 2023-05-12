import React from "react";
import { useHistory } from "react-router-dom";

function CreateNewSpotButton({ sessionUser }) {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push('/spots/new')
    }

    return (
        <li id='header_create_spot' className={!sessionUser ? 'hidden' : null}>
            <button onClick={handleClick} id='header_button'>Create a New Spot</button>
        </li>
    );
}

export default CreateNewSpotButton;