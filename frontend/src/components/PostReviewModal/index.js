import React from "react";
import { useState } from "react";
import './PostReviewModal.css';
import StarRating from "./StarRating";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/reviews";

function PostReviewModal({spotId}) {
    const [review, setReview] = useState('')
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);



    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(postReview(spotId, {
            review,
            stars: rating
        }));

        closeModal();
    }


    return (
        <form id='post-review' onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            <textarea placeholder="Leave your review here..." value={review} onChange={(e) => setReview(e.target.value)}></textarea>
            <StarRating rating={rating} setRating={setRating} />
            <button type='submit'>Submit Your Review</button>
        </form>
    );
}

export default PostReviewModal;