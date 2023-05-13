import { useState, useEffect } from 'react'

const StarRating = ({ rating, setRating }) => {
  const [activeRating, setActiveRating] = useState(0)

  useEffect(() => {
    setActiveRating(rating)
  }, [rating])
  return (
    <>
      <div className="rating-input">
        <div>
          <i onMouseEnter={(e) => setActiveRating(1)}
            className={`fa-${rating >= 1 || activeRating >= 1 ? 'solid' : 'regular'} fa-star`}
            onMouseLeave={(e) => setActiveRating(rating)}
            onClick={(e) => setRating(1)}></i>
        </div>
        <div>
          <i onMouseEnter={(e) => setActiveRating(2)}
            className={`fa-${rating >= 2 || activeRating >= 2 ? 'solid' : 'regular'} fa-star`}
            onMouseLeave={(e) => setActiveRating(rating)}
            onClick={(e) => setRating(2)}>
          </i>
        </div>
        <div>
          <i
            onMouseEnter={(e) => setActiveRating(3)}
            className={`fa-${rating >= 3 || activeRating >= 3 ? 'solid' : 'regular'} fa-star`}
            onMouseLeave={(e) => setActiveRating(rating)}
            onClick={(e) => setRating(3)}></i>
        </div>
        <div>
          <i onMouseEnter={(e) => setActiveRating(4)} className={`fa-${rating >= 4 || activeRating >= 4 ? 'solid' : 'regular'} fa-star`} onMouseLeave={(e) => setActiveRating(rating)} onClick={(e) => setRating(4)}></i>
        </div>
        <div>
          <i onMouseEnter={(e) => setActiveRating(5)} className={`fa-${rating >= 5 || activeRating >= 5 ? 'solid' : 'regular'} fa-star`} onMouseLeave={(e) => setActiveRating(rating)} onClick={(e) => setRating(5)}></i>
        </div>
        <p> Stars</p>
      </div>
    </>
  );
};

export default StarRating;