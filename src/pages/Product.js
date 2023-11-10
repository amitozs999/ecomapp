import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import ProductCardNew from "../components/cards/ProductCardnew";
import LoadingCard from "../components/cards/LoadingCard";

//single prod page for its details
const Product = ({ match }) => {
  const { slug } = match.params;
  const [product, setProduct] = useState({});
  //const { user, cart, userwishlist } = useSelector((state) => ({ ...state }));
  const [star, setStar] = useState(0);
  const { user, userwishlist } = useSelector((state) => ({ ...state }));
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingwish, setLoadingwish] = useState(false);

  const [isinwish, setisinwish] = useState(false);

  // const isinwish=false;
  useEffect(() => {
    loadSingleProduct();
  }, [slug]); //slug change load prod again

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => {
      setProduct(res.data); //get currprod
      setLoading(true);

      console.log("vvv list after fechinh prod kya he", userwishlist);

      getRelated(res.data._id).then((res) => {
        setRelated(res.data); //get related prod for currprod
        setLoading(false);
      });

      userwishlist.data !== undefined &&
        userwishlist.data.wishlist.some((w) => {
          if (w._id.toString() === res.data._id.toString()) {
            setisinwish(true);
            console.log("vvv isinwish true mared in prod page", isinwish);
          }
        });
      setLoadingwish(true);
    });

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

  const changeisinwish = () => {
    setisinwish(!isinwish);
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        {/* //comp for single prod */}

        {!loadingwish ? (
          <h1>fg</h1> //show 3 loading cards for products jab tak loading true he he load nhi hue
        ) : (
          <SingleProduct
            product={product} //3 props passing to singleprod component
            onStarClick={onStarClick}
            star={star}
            isinwish={isinwish}
            changeisinwish={changeisinwish}
          />
        )}
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      {/* //<div className="row pb-5"> */}
      <div className="container ">
        {
          loading ? (
            <LoadingCard count={3} /> //show 3 loading cards for products jab tak loading true he he load nhi hue
          ) : (
            <div className="  h-96 p-3 flex flex-col lg:flex-row justify-between ml-10 mr-10 my-10 lg:my-0">
              {related.map((r) => (
                <div key={r._id} className="    h-80 w-52">
                  <ProductCardNew product={r} />
                </div>
              ))}
            </div>
          )
          // related.length ? (
          //   related.map((r) => (
          //     <div key={r._id} className="  h-80 w-52">
          //       <ProductCardNew product={r} />
          //     </div>
          //   ))
          // )
          // : (
          //   <div className="text-center col">No Products Found</div>
          // )
        }
      </div>
    </div>
  );
};

export default Product;
