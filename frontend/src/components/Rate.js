import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rate = () => {
  const [rating, setRating] = useState(null);
  console.log(rating);
  return (
    <div className='rate'>
      {[...Array(5)].map((star, i) => {
        let ratingValue = i + 1;
        console.log(ratingValue)
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar className="star" color={ratingValue<= rating ? "#ffc107" :"#e4e5e9"} size={50} />
          </label>
        );
      })}
    </div>
  );
};

export default Rate;
