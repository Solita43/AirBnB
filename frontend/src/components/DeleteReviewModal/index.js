import React from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";

function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        return dispatch().then(() => closeModal());
    }

    return (
        <div id='delete-spot-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this Review?</p>
            <button onClick={handleDelete}>Yes(Delete Review)</button>
            <button onClick={closeModal}>No(Keep Review)</button>
        </div>
    );
}

export default DeleteReviewModal;