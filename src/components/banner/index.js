import React from "react";
import BannerBox from "./BannerBox";

//mport laptop from "./asasas.jpg";
import "./../../index.css";

const Banner = () => {
  const bannerContent = [
    {
      id: "1",
      title: "larisaTitle",
      description: "larisaDescription",
      buttonText: "SHOP-NOW",
      imgSrc: "laptop",
      imgWidth: 980,
      imgHeight: 590,
      codee: "SHP40",
      numberOfDiscountDate: 3,
      href: "/",
      discount: "40",
      slug: "/product/jbl-tune-720b-headphone",
    },

    {
      id: "2",
      title: "romanoTitle",
      description: "romanoDescription",
      buttonText: "SHOP-NOW",
      //imgSrc: "/images/banners-img/home2.webp",
      imgSrc: "laptop",
      imgWidth: 980,
      imgHeight: 500,
      codee: "SHP25",
      numberOfDiscountDate: 7,
      href: "/",
      discount: "25",
      slug: "/product/nike-mens-nike-air-max",
    },
  ];

  return (
    // margin tb is 4 default           my-4
    // margin tb is 8 for width >720    md:my-8

    //main banner div

    //flex-col vertical banner inside this
    <>
      <div className="container -mt-10 mb-20">
        <div className=" flex items-center flex-col w-full my-4 md:my-8 mx-auto xl:max-w-[2100px]">
          {/* //flex items-center flex-col w-full xl:max-w-[2100px] my-4 md:my-8 mx-auto */}
          <h2 className="mt-16 mb-12 mx-auto text-2xl"> Discount Offers </h2>
          {/* <SectionTitle title={"specialSale"} /> */}

          {/* //contains banner box inside this div */}

          {/* //grid-cols-6           6 box verticallly   then again 6 box verticalll   
    //grid-template-columns: repeat(6, minmax(min-content, max-content));

    //lg:grid-cols-12        12 box verticallly   then again 12 box verticalll  when with?1024  */}

          <div className="  grid gap-4 grid-cols-6 lg:grid-cols-12 pl-9 pr-9 ">
            {/* grid gap-4 grid-cols-6 lg:grid-cols-12 */}
            {bannerContent.map(
              ({
                id,
                title,

                description,
                numberOfDiscountDate,
                href,
                imgHeight,
                codee,
                imgSrc,
                imgWidth,
                buttonText,
                discount,
                slug,
              }) => {
                return (
                  <BannerBox
                    title={title}
                    id={id}
                    description={description}
                    numberOfDiscountDate={numberOfDiscountDate}
                    href={href}
                    imgSrc={imgSrc}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    codee={codee}
                    buttonText={buttonText}
                    key={title}
                    discount={discount}
                    slug={slug}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
