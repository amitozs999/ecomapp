import React, { useState, useEffect } from "react";
import { getProductsall } from "../../functions/product";
import ProductCard from "../../components/cards/ProductCard";
import ProductCardNew from "../../components/cards/ProductCardnew";

import LoadingCard from "../../components/cards/LoadingCard";

const ViewAllProd = ({ match }) => {
  //show products based on this categ

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    console.log("viewall slug", match);
    console.log("viewall slug", match.params);
    console.log("viewall slug", slug);
    setLoading(true);
    //"sold", "desc"
    if (slug == "popular") {
      console.log("viewall slug popular he", slug);
      getProductsall("sold", "desc").then((res) => {
        //page change fetch prod again for this page
        console.log("viewall slug popular he ka res", res);
        console.log("bbbbbbbbb", res.data);

        setProducts(res.data);
        setLoading(false);
      });
    } else if (slug == "newarrival") {
      getProductsall("createdAt", "desc").then((res) => {
        //page change fetch prod again for this page
        console.log("viewall slug popular he ka res", res);
        console.log("bbbbbbbbb", res.data);

        setProducts(res.data);
        setLoading(false);
      });
    }

    // getCategory(slug).then((res) => {
    //   console.log(JSON.stringify(res.data, null, 4));
    //   setCategory(res.data.category); //fetchd categ details and set it
    //   setProducts(res.data.products); //set fetched products related to slug categ
    //   setLoading(false);
    // });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4  ">
              Loading...
            </h4>
          ) : (
            // {
            //   (slug=="popular")?( <h4 className="text-center p-3 mt-5 mb-5 display-4  ">
            //   All Popular Products
            // </h4>):( <h4 className="text-center p-3 mt-5 mb-5 display-4  ">
            //   All Popular Products
            // </h4>)
            // }
            <h4 className="text-center p-3 mt-5 mb-5 display-4  ">
              All {slug == "popular" ? "Popular" : "New Arrival"} Products
            </h4>
          )}
        </div>
      </div>

      {/* <h4>fge</h4> */}

      {/* //show all products related to this categ */}
      {/* <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCardNew product={p} />
          </div>
        ))}
      </div> */}

      <div className="container " style={{ marginBottom: "60px" }}>
        {loading ? (
          <LoadingCard count={4} /> //show 3 loading cards for products jab tak loading true he he load nhi hue
        ) : (
          <div
            className="    flex flex-wrap  ml-auto mr-auto  "
            style={{
              backgroundColor: "black !important",
              //  marginBottom: "1160px",
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className=" h-80 w-52  "
                // flex: 1 0 21%;
                // flex-grow to 0.
                style={{
                  flex: "0 1 21%",
                  marginBottom: "60px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <ProductCardNew product={product} type="categ" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllProd;
