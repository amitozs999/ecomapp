import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0); //find tot rat sum, prev+net each time till end
    // console.log("totalReduced", totalReduced);

    let highest = length * 5; // max possible
    // console.log("highest", highest);

    let result = (totalReduced * 5) / highest; //tsum*5/high
    // console.log("result", result);

    return (
      <div className="    pb-1 mb-1" style={{ marginLeft: "14px" }}>
        <span>
          <StarRating //show that much stars
            starDimension="19px"
            starSpacing="1px"
            starRatedColor="#FAE898FF"
            rating={result}
            editing={false}
          />
          {"   "}({p.ratings.length})
        </span>
      </div>
    );
  }
};
