import React from "react";
import { useState } from "react";
import './PostReviewModal.css';
import StarRating from "./StarRating";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/reviews";

function PostReviewModal({ spotId }) {
    const [review, setReview] = useState('')
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    let err;



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})

        dispatch(postReview(spotId, {
            review,
            stars: rating
        })).then(() => setIsSubmitted(true)).catch(async res => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        })

        if (isSubmitted) {
            setIsSubmitted(false);
            closeModal()
        } else {
            if (Object.values(errors).length) {
                err = Object.values(errors);
            }
        }
    }


    return (
        <form id='post-review' onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            {err && err.map(e => (
                <p className="errors">{e}</p>
            ))}
            <textarea required placeholder="Leave your review here..." value={review} onChange={(e) => setReview(e.target.value)}></textarea>
            <StarRating rating={rating} setRating={setRating} />
            <button disabled={review.length < 10 || rating === 0} type='submit'>Submit Your Review</button>
        </form>
    );
}

export default PostReviewModal;