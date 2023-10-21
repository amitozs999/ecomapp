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

const Category = () => {
  const history = useHistory();

  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    //document.body.div;
    console.log(isHovered);
  }, [isHovered]); //run again when ok change

  const handleMouseOver = (e) => {
    switch (e.target.id) {
      case "1":
        //setIsHovered(1);
        // console.log("here1");
        break;
      case "2":
        // setIsHovered(2);
        // console.log("here2");
        break;
    }
  };

  return (
    <div className="categdivhead">
      <div>
        <h2 className="txtcateg">Browse By Category</h2>
      </div>

      <div className="containercateg">
        <div
          id="1"
          className="items zoomm"
          onClick={() => history.push("/category/electronics")}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setIsHovered(null)}
        >
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2 imz"
            src={prod01}
          >
            {/* <Link to={`/product/`}></Link> */}
          </img>
          <h5 class="txtcategbottom">Electronics</h5>
        </div>
        <div
          id="2"
          className="items zoomm imz"
          onClick={() => history.push("/category/accesories")}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setIsHovered(null)}
        >
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2 imz"
            src={prod1}
          ></img>
          <h5 class="txtcategbottom">Accesories</h5>
        </div>
        <div
          className="items zoomm imz"
          onClick={() => history.push("/category/beauty")}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setIsHovered(null)}
        >
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2 imz"
            src={prod2}
          ></img>
          <h5 class="txtcategbottom">Beauty</h5>
        </div>
        <div
          className="items zoomm"
          onClick={() => history.push("/category/clothing")}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setIsHovered(null)}
        >
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2 imz"
            src={cloth}
          ></img>
          <h5 class="txtcategbottom">Clothing</h5>
        </div>
        <div
          className="items zoomm imz"
          onClick={() => history.push("/category/stationary")}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setIsHovered(null)}
        >
          <img
            height={"120px"}
            width={"100px"}
            className="mb-2 py-2 imz"
            src={pen}
          ></img>
          <h5 class="txtcategbottom">Stationary</h5>
        </div>
        <div
          className="items zoomm imz"
          onClick={() => history.push("/category/kids")}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setIsHovered(null)}
        >
          <img
            height={"110px"}
            width={"100px"}
            className="mb-2 py-2 imz"
            src={kidss}
          ></img>
          <h5 class="txtcategbottom">Kids</h5>
        </div>
      </div>
    </div>
  );
};
export default Category;
