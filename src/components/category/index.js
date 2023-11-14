import React, { useEffect } from "react";
// import { categorySmContent } from "../../mock/category-sm";
// import CategorySmBox from "./CategorySmBox";
// import { categoryLgContent } from "../../mock/category-lg";
// import CategoryLgBox from "./CategoryLgBox";
// import SectionTitle from "../UI/SectionTitle";
import { Link } from "react-router-dom";
import "./index.scss";

import { useHistory } from "react-router-dom";
import { useState } from "react";

import { categoryContent } from "./catlist";
import CategBox from "./catBox";

const Category = () => {
  return (
    <>
      <div className="catcontainer">
        {/* <h2 className="my-4 md:my-8 lg:mt-10  ml-36  text-2xl"> */}

        <h2 className="cathead">Browse By Category</h2>

        <div className="catcontainerdiv">
          {categoryContent.map(({ id, slug, bottomText, imgg }) => {
            return (
              <CategBox
                id={id}
                bottomText={bottomText}
                slug={slug}
                imgg={imgg}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Category;

{
  /* {categoryContent.map(

          ()=>{
            
          }

  )} */
}
