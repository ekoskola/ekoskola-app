import React, { useState } from 'react';
import styled from 'styled-components';

const Star = styled.span`
  font-size: 2rem;
  color: ${props => (props.selected ? '#ffc107' : '#bbb')};
  cursor: pointer;
`;

const StarRatingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function StarRating({ onChange }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = value => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} selected={i <= rating} onClick={() => handleStarClick(i)}>
          ★
        </Star>,
      );
    }
    return stars;
  };

  return <StarRatingContainer>{renderStars()}</StarRatingContainer>;
}

export default StarRating;
