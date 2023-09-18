import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

//single prod page for its details
const Product = ({ match }) => {
  const { slug } = match.params;
  const [product, setProduct] = useState({});

  const [star, setStar] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]); //slug change load prod again

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  useEffect(() => {
    //user login he, show using uski old rating for this product if not null
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString() //finf is use user ki rating for this prod
      );

      existingRatingObject && setStar(existingRatingObject.star); // current user's star/rating set karde ab
    }
  });

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      //hit api to update rating
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        {/* //comp for single prod */}
        <SingleProduct
          product={product} //3 props passing to singleprod component
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
