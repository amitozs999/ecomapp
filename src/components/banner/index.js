import React from "react";
import BannerBox from "./BannerBox";

import laptop from "./asasas.jpg";
import "./../../index.css";

const Banner = () => {
  const bannerContent = [
    {
      title: "larisaTitle",
      description: "larisaDescription",
      buttonText: "Heelo oye ji",
      imgSrc: "laptop",
      imgWidth: 980,
      imgHeight: 590,
      numberOfDiscountDate: 9,
      href: "/",
    },

    {
      title: "romanoTitle",
      description: "romanoDescription",
      buttonText: "see",
      // imgSrc: "/images/banners-img/home2.webp",
      imgSrc: "laptop",
      imgWidth: 980,
      imgHeight: 500,
      numberOfDiscountDate: 7,
      href: "/",
    },
  ];

  return (
    // margin tb is 4 default           my-4
    // margin tb is 8 for width >720    md:my-8

    //main banner div

    //flex-col vertical banner inside this

    <div className=" flex items-center flex-col w-full my-4 md:my-8 mx-auto xl:max-w-[2100px]">
      {/* //flex items-center flex-col w-full xl:max-w-[2100px] my-4 md:my-8 mx-auto */}
      <h2 className="my-4 md:my-8 lg:mt-10 mx-auto text-3xl">
        {" "}
        Discount Offers{" "}
      </h2>
      {/* <SectionTitle title={"specialSale"} /> */}

      {/* //contains banner box inside this div */}

      {/* //grid-cols-6           6 box verticallly   then again 6 box verticalll   
    //grid-template-columns: repeat(6, minmax(min-content, max-content));

    //lg:grid-cols-12        12 box verticallly   then again 12 box verticalll  when with?1024  */}

      <div className="bg-cyan-700 grid gap-4 grid-cols-6 lg:grid-cols-12 pl-10 pr-10">
        {/* grid gap-4 grid-cols-6 lg:grid-cols-12 */}
        {bannerContent.map(
          ({
            title,
            description,
            numberOfDiscountDate,
            href,
            imgHeight,
            imgSrc,
            imgWidth,
            buttonText,
          }) => {
            return (
              <BannerBox
                title={title}
                description={description}
                numberOfDiscountDate={numberOfDiscountDate}
                href={href}
                imgSrc={imgSrc}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                buttonText={buttonText}
                key={title}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Banner;
