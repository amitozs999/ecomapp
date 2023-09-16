import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

//single prod page for its details
const Product = ({ match }) => {
  const { slug } = match.params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    loadSingleProduct();
  }, [slug]); //slug change load prod again

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        {/* //comp for single prod */}
        <SingleProduct product={product} />
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
