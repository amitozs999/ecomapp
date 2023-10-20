import React from "react";
import { useCountdown } from "./useCountdown";
import ExpiredNotice from "./ExpiredNotice";
import ShowCounter from "./ShowCounter";

const DiscountFlipCountdown = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default DiscountFlipCountdown;
