import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className=" flex rtl:flex-row-reverse items-center absolute top-5 py-2 right-0 left-auto">
      <DateTimeDisplay value={days} type={"days"} isDanger={days <= 3} />
      <p className="  font-bold text-lg text-palette-secondary text-neutral-50">
        :
      </p>
      <DateTimeDisplay value={hours} type={"hours"} isDanger={false} />
      <p className="font-bold text-lg text-palette-secondary text-neutral-50">
        :
      </p>
      <DateTimeDisplay value={minutes} type={"mins"} isDanger={false} />
      <p className="font-bold text-lg text-palette-secondary text-neutral-50">
        :
      </p>
      <DateTimeDisplay value={seconds} type={"sec"} isDanger={false} />
    </div>
  );
};

export default ShowCounter;
