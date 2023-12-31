import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import ProductCardNew from "../../components/cards/ProductCardnew";

import LoadingCard from "../../components/cards/LoadingCard";

const CategoryHome = ({ match }) => {
  //show products based on this categ

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);

    console.log("cat slug", slug);

    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category); //fetchd categ details and set it
      setProducts(res.data.products); //set fetched products related to slug categ
      setLoading(false);
    });
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
            <h4 className="text-center p-3 mt-5 mb-5 display-4  ">
              {products.length} Products in {category.name} category
            </h4>
          )}
        </div>
      </div>

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

export default CategoryHome;
