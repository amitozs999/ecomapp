import React from "react";
import BannerBox from "./BannerBox";

import laptop from "../../images/asas.jpg";

const Banner = () => {
  const bannerContent = [
    {
      title: "larisaTitle",
      description: "larisaDescription",
      buttonText: "see",
      imgSrc: "laptop",
      imgWidth: 980,
      imgHeight: 500,
      numberOfDiscountDate: 9,
      href: "/",
    },
    // ,
    // {
    //   title: "romanoTitle",
    //   description: "romanoDescription",
    //   buttonText: "see",
    //   // imgSrc: "/images/banners-img/home2.webp",
    //   imgSrc: "laptop",
    //   imgWidth: 980,
    //   imgHeight: 500,
    //   numberOfDiscountDate: 7,
    //   href: "/",
    // },
  ];

  return (
    <div className="flex items-center flex-col w-full xl:max-w-[2100px] my-4 md:my-8 mx-auto">
      <h2 className="my-4 md:my-8 lg:mt-10 mx-auto text-3xl"> specialSale </h2>
      {/* <SectionTitle title={"specialSale"} /> */}

      <div className="grid gap-4 grid-cols-6 lg:grid-cols-12">
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
