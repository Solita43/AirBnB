import React from "react";
import { useHistory } from "react-router-dom";

function CreateNewSpotButton() {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push('/spots/new')
    }

    return (
        <li>
            <button onClick={handleClick}>Create a New Spot</button>
        </li>
    );
}

export default CreateNewSpotButton;