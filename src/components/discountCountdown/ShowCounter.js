import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";

import "./index.scss";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    // <div className=" flex rtl:flex-row-reverse items-center absolute top-5 py-2 right-0 left-auto">
    <div className="counterdiv">
      <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
      <p className="  font-bold text-lg text-palette-secondary text-neutral-50">
        :
      </p>
      <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      <p className="font-bold text-lg text-palette-secondary text-neutral-50">
        :
      </p>
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      <p className="font-bold text-lg text-palette-secondary text-neutral-50">
        :
      </p>
      <DateTimeDisplay value={seconds} type={"Sec"} isDanger={false} />
    </div>
  );
};

export default ShowCounter;
