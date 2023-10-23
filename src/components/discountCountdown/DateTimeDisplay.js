import React from "react";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  const dateTime = Intl.NumberFormat("en-EN").format(value);
  //bg-slate-200
  //text-[11px] sm:text-sm md:text-base
  return (
    <div
      // className={` bg-white flex flex-col  items-center mx-[1px] sm:mx-3 py-2   h-10 w-8 sm:w-10 backdrop-filter backdrop-blur-[8px] bg-palette-fill/50 shadow-lg rounded-lg ${
      className={` bg-gray-100  flex flex-col items-center mx-[2px] sm:mx-3 py-2 w-8 sm:w-9  backdrop-filter backdrop-blur-[8px] bg-palette-fill/50 shadow-lg rounded-lg ${
        isDanger ? "text-rose-600" : ""
      }`}
    >
      <p className="text-xs font-bold">{dateTime}</p>
      <span className="text-xs ">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
