import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";
import './DeleteModal.css'

function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState('');

    const handleDelete = () => {
        return dispatch(deleteReview(reviewId)).then(() => closeModal()).catch(async (res) => {
            const data = await res.json();
            if (data.message) {
                setErrors(data.message);
            }
        });
    }

    if (errors) {
        window.alert(errors);
    }

    return (
        <div className='delete-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this Review?</p>
            <button className='modal_delete' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='modal_cancel_delete' onClick={closeModal}>No (Keep Review)</button>
        </div>
    );
}

export default DeleteReviewModal;