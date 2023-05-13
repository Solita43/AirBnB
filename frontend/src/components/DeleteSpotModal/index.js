import React from "react";
import { useDispatch } from 'react-redux';
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";

function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        return dispatch(deleteSpot(spotId)).then(() => closeModal());
    }

    return (
        <div className='delete-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listing?</p>
            <button className='modal_delete' onClick={handleDelete}>Yes(Delete Spot)</button>
            <button className='modal_cancel_delete' onClick={closeModal}>No(Keep Spot)</button>
        </div>
    );
}

export default DeleteSpotModal;