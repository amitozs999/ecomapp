import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card
          // className="mb-40 "
          // bodyStyle={{ margin: "6" }}
          style={{
            width: "100%",
            // height: "9100px",
            //background: "red",
            // marginLeft: "20px",
            // marginRight: "20px",
            // margin: "auto",
            marginBottom: "15px",
          }}
        >
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="col   ">{cards()}</div>;
};

export default LoadingCard;
