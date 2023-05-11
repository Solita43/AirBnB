import React from "react";
import { useState } from "react";
import './PostReviewModal.css';
import StarRating from "./StarRating";

function PostReviewModal() {
    const [review, setReview] = useState('')
    return (
        <div id='post-review'>
            <h1>How was your stay?</h1>
            <textarea placeholder="Leave your review here..." value={review} onChange={(e) => setReview(e.target.value)}></textarea>
            <StarRating />
        </div>
    );
}

export default PostReviewModal;