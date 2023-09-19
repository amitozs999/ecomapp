import React from "react";
import StarRating from "react-star-ratings";

const Star = (
  { starClick, numberOfStars } //pass value to parrent though this when star filter updated on click
) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor="red"
    />
    <br />
  </>
);

export default Star;
