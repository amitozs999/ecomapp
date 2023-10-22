import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card
          className="col-md-2 "
          // bodyStyle={{ margin: "6" }}
          style={{
            width: "100%",
            height: "100%",
            //background: "red",
            // marginLeft: "20px",
            // marginRight: "20px",
            margin: "auto",
          }}
        >
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="row pb-5  ">{cards()}</div>;
};

export default LoadingCard;
