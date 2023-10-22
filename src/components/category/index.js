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
    <div className="categdivhead">
      <div>
        <h2 className="txtcateg">Browse By Category</h2>
      </div>

      <div className="containercateg">
        {/* {categoryContent.map(

          ()=>{
            
          }

  )} */}

        {categoryContent.map(({ id, slug, bottomText, imgg }) => {
          return (
            <CategBox id={id} bottomText={bottomText} slug={slug} imgg={imgg} />
          );
        })}
      </div>
    </div>
  );
};
export default Category;
