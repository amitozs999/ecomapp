//import Image from "next/image";
import React from "react";
import DiscountCountdown from "../../components/discountCountdown/DiscountCountdown.js";
//import Link from "next/link";
//import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

//import laptop from "../../images/asas.jpg";
import laptop2 from "./xx1.jpg";
import laptop from "./axax.png";
import "./index.scss";
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
    <div className="col-span-6 lg:col-span-6 flex  justify-center shadow-2xl relative rounded-lg overflow-hidden  ">
      {/* <div className="bannertextdiv"></div> */}

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
        className=" justify-between items-center  block absolute 
        ml-auto  
       right-0
        top-16
     
        // FLAT 40% OFF 
       
       sm:left-6         sm:w-[55%]  md:w-1/2       lg:w-[55%] xl:w-1/2"
      > */}
      {/* <div className="bannertextdiv"> */}
      {/* <h3 className="float-right mr-6 font-mono text-white text-xl font-bold xxs:text-xs  sm:text-sm   md:text-2xl ltr:mr-4  sm:pt-8 lg:pt-2 xl:pt-8"> */}

      {/* <h3 className="float-right   text-white     md:text-xl"> */}

      <div className="textdiv">
        <h3 className="flattext font-mono">FLAT {discount}% OFF</h3>
        {/* <h3 className="float-right mr-6 font-serif text-white text-xl font-bold sm:text-xs/3 sm:font-normal md:text-xl   ltr:mr-4   ">
         */}
        <h3 className="codetext font-serif">Use Code : {codee}</h3>

        <a
          onClick={() => history.push(slug)}
          //product/nike-mens-nike-air-max
          // className="  py-2 px-3 sm:py-3 lg:py-2 xl:py-4 sm:px-4 rounded   float-right mr-3
          //   transition-all duration-300 shadow-lg 2xl:mt-2 text-center zoommm2 inline-block  text-yellow-300 text-[12px] rtl:sm:text-xs   font-semibold"

          className="shopbutton transition-all duration-300 shadow-lg zoommm2"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default BannerBox;

//banner box ka div  -> img
//

// grid-column: grid-column-start / grid-column-end;

//relative sto show overlap all div images on each other

{
  /* <div
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
      > */
}
