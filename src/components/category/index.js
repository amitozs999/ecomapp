import React from "react";
// import { categorySmContent } from "../../mock/category-sm";
// import CategorySmBox from "./CategorySmBox";
// import { categoryLgContent } from "../../mock/category-lg";
// import CategoryLgBox from "./CategoryLgBox";
// import SectionTitle from "../UI/SectionTitle";
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

const Category = () => {
  return (
    <div className="categdivhead">
      <div>
        <h2 className="txtcateg">Browse By Category</h2>
      </div>

      <div className="containercateg">
        <div className="items">
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2"
            src={prod01}
          ></img>
          <h5 class="txtcategbottom">Electronics</h5>
        </div>
        <div className="items">
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2"
            src={prod1}
          ></img>
          <h5 class="txtcategbottom">Accesories</h5>
        </div>
        <div className="items">
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2"
            src={prod2}
          ></img>
          <h5 class="txtcategbottom">Beauty</h5>
        </div>
        <div className="items">
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2"
            src={cloth}
          ></img>
          <h5 class="txtcategbottom">Clothing</h5>
        </div>
        <div className="items">
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2"
            src={pen}
          ></img>
          <h5 class="txtcategbottom">Stationary</h5>
        </div>
        <div className="items">
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2"
            src={kidss}
          ></img>
          <h5 class="txtcategbottom">Kids</h5>
        </div>
      </div>
    </div>
  );
};
export default Category;
