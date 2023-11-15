import React from "react";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  const dateTime = Intl.NumberFormat("en-EN").format(value);
  //bg-slate-200
  //text-[11px] sm:text-sm md:text-base
  return (
    <div
      className={` bg-gray-100  counteritemdiv backdrop-filter backdrop-blur-[8px] bg-palette-fill/50 shadow-lg rounded-lg ${
        isDanger ? "text-rose-600" : ""
      }`}

      // className="counteritemdiv"
    >
      <p className="itemtext font-bold">{dateTime}</p>
      <span className=" itemtext">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
