import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

type Props = {
  rating: number;
};

const Rating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  //*help display the number of stars rated by user
  const fullStarsElements = Array.from({ length: fullStars }, (_, index) => (
    <FaStar key={`full-star-${index}`} />
  ));

  let halfStarElement = null;

  if (decimalPart > 0) {
    halfStarElement = <FaStarHalf key="half-star" />;
  }

  return (
    <>
      {fullStarsElements} {halfStarElement}
    </>
  );
};

export default Rating;
