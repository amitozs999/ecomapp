import React, { useEffect } from "react";
// import { categorySmContent } from "../../mock/category-sm";
// import CategorySmBox from "./CategorySmBox";
// import { categoryLgContent } from "../../mock/category-lg";
// import CategoryLgBox from "./CategoryLgBox";
// import SectionTitle from "../UI/SectionTitle";
import { Link } from "react-router-dom";
import "./index.scss";
import prod01 from "./prod01.jpg";
import prod1 from "./prod1.jpg";
import prod2 from "./prod2.jpg";
import prod3 from "./prod3.jpg";
import prod4 from "./prod4.jpg";
import prod5 from "./prod5.jpg";
import cloth from "./cloth.jpg";
import pen from "./pen.jpg";
import kidss from "./kidss.jpg";
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

        {categoryContent.map(({ id, slug, bottomText }) => {
          return <CategBox id={id} bottomText={bottomText} slug={slug} />;
        })}
      </div>
    </div>
  );
};
export default Category;
