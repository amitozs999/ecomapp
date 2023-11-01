import React, { Fragment } from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, num, starEmptyColor = "orange" }) => (
  <Fragment>
    <StarRating
      changeRating={() => starClick(num.starNum)}
      numberOfStars={num.starNum}
      starDimension="20px"
      starSpacing="2px"
      starEmptyColor={starEmptyColor}
      starHoverColor={starEmptyColor}
      editing={false}
    />
  </Fragment>
);

export default Star;
