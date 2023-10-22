import React from "react";

import "./index.scss";
//import prod01 from "./prod01.jpg";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const CategBox = ({ id, slug, bottomText, imgg }) => {
  const history = useHistory();

  const [isHovered, setIsHovered] = useState(null);
  console.log(bottomText + "f");
  console.log(slug + "fg");
  console.log(id + "fgd");

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
    <div
      id={id}
      className="items zoomm"
      onClick={() => history.push(slug)}
      onMouseOver={handleMouseOver}
      onMouseOut={() => setIsHovered(null)}
    >
      <img
        height={"110px"}
        width={"100px"}
        className="mb-2 py-2 imz"
        src={imgg}
        // src="images/prod01.jpg" to refer from public/images/prod01    images/+{prod01.jpg}
      >
        {/* <Link to={`/product/`}></Link> */}
      </img>
      <h5 class="txtcategbottom">{bottomText}</h5>
    </div>
  );
};

export default CategBox;
