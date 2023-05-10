import React from "react";
import { useDispatch } from 'react-redux';
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";

function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleDelete = () => {
        return dispatch(deleteSpot(spotId));
    }

    return (
        <div id='delete-spot-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listing?</p>
            <button onClick={handleDelete}>Yes(Delete Spot)</button>
            <button onClick={closeModal}>No(Keep Spot)</button>
        </div>
    );
}

export default DeleteSpotModal;