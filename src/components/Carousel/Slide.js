import React from "react";

//import { useLanguage } from "../../hooks/useLanguage";

import asas from "./beauty.jpg";

const Slide = ({ title, description, bgImg, url }) => {
  //const { t } = useLanguage();

  return (
    <>
      {/* <div>
     
      </div> */}

      <div
      //className={`relative w-[100%] h-[50vh] md:h-[70vh] bg-cover bg-center bg-no-repeat`}
      >
        <img
          src={bgImg}
          height={"274px"}
          width={"610px"}
          //  class="align-middle"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "center",
          }}
          // className={`relative w-[100%] h-[50vh] md:h-[70vh] bg-cover bg-center bg-no-repeat`}
        />
      </div>

      {/* <div style="background-image: url(asas); height: 400px; width: 400px;">
        Text here
      </div> */}
    </>
  );
};

export default Slide;
