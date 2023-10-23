//import Image from "next/image";
import React from "react";
import DiscountCountdown from "../../components/discountCountdown/DiscountCountdown.js";
//import Link from "next/link";
//import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

//import laptop from "../../images/asas.jpg";
import laptop2 from "./xx1.jpg";
import laptop from "./axax.png";
import "./index.css";
import { useHistory } from "react-router-dom";
const BannerBox = ({
  title,
  id,
  description,
  imgSrc,
  imgWidth,
  imgHeight,
  codee,
  numberOfDiscountDate,
  buttonText,
  href,
  discount,
  slug,
}) => {
  //const { width } = useWindowDimensions();
  //let imageWidth = width >= 2000 ? 1300 : imgWidth;
  // let imageWidth = 1300;
  console.log("kk" + id);
  console.log("k1k" + codee);
  const history = useHistory();

  let x = id === "1" ? laptop : laptop2;

  return (
    //banner box ka div  -> img
    //

    // grid-column: grid-column-start / grid-column-end;

    //relative sto show overlap all div images on each other

    <div className="col-span-6 lg:col-span-6 flex  justify-center shadow-2xl relative rounded-lg overflow-hidden dark:bg-gray-500/70 !dark:bg-blend-multiply">
      {/* //col-span-6 lg:col-span-6 flex  justify-center  shadow-2xl relative rounded-lg overflow-hidden dark:bg-gray-500/70 !dark:bg-blend-multiply */}
      <img
        width="200"
        height="300"
        src={x}
        // alt={title}
        className=" zoommm drop-shadow-lg  object-cover object-center  w-full  hover:scale-110 transition duration-1000"
      />

      {/* //absolute  overlap on div */}
      <DiscountCountdown targetDate={numberOfDiscountDate} />

      {/* <div
        className="flex justify-between items-center sm:block absolute 
        ml-auto  
       right-0
        mt-10
      bg-pink-600
       ltr:top-[15%] top-[25%]  
       ltr:sm:top-3 sm:top-3  
       ltr:md:top-8   md:top-8 
       ltr:lg:top-2   lg:top-2 
       ltr:2xl:top-6  2xl:top-6 
       sm:left-6      sm:w-[55%]  md:w-1/2       lg:w-[55%] xl:w-1/2"
      > */}

      <div
        className="flex justify-between items-center sm:block absolute 
        ml-auto  
       right-0
        top-16
     
        // FLAT 40% OFF 
       
       sm:left-6      sm:w-[55%]  md:w-1/2       lg:w-[55%] xl:w-1/2"
      >
        <h3 className="float-right mr-6 font-mono text-white text-xl font-bold sm:text-2xl sm:font-normal md:text-2xl ltr:mr-4  sm:pt-8 lg:pt-2 xl:pt-8">
          FLAT {discount}% OFF
        </h3>
        <h3 className="float-right mr-6 font-serif text-white text-xl font-bold sm:text-2xl sm:font-normal md:text-xl ltr:mr-4   ">
          Use Code : {codee}
        </h3>

        {/* <p className=" sm:block   leading-6 lg:text-[12px] xl:text-base my-2 sm:my-4 lg:my-2 2xl:my-4 rtl:2xl:mt-6">
          {description}
        </p> */}

        <a
          onClick={() => history.push(slug)}
          //product/nike-mens-nike-air-max
          className="  py-2 px-3 sm:py-3 lg:py-2 xl:py-4 sm:px-4 rounded   float-right mr-3
          transition-all duration-300 shadow-lg 2xl:mt-2
          
        
         text-center zoommm2

            inline-block  text-yellow-300 text-[12px] rtl:sm:text-xs   font-semibold"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default BannerBox;
