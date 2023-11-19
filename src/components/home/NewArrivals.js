import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import ProductCardNew from "../cards/ProductCardnew";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

import { useHistory } from "react-router-dom";

import "./index.scss";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const [mqlval, setmqlval] = useState(false);
  const history = useHistory();
  let mql = window.matchMedia("(max-width: 762px)");

  const [loadercnt, setloadercnt] = useState(4);

  useEffect(() => {
    console.log("mqlvalue", mql);
    console.log("mqlvalue", mql.matches);
    console.log("mqlvalue", loadercnt);

    if (mql.matches) {
      setloadercnt(1);
      setmqlval(true);
    } else {
      setloadercnt(4);
      setmqlval(false);
    }

    loadAllProducts();
  }, [page]); //page change fetch prod again for new page

  useEffect(() => {
    getProductsCount().then((res) => {
      console.log(res.data + "g");
      setProductsCount(res.data); //setProductsCount(res.data.length)
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    console.log(page + "guu");
    getProducts("createdAt", "desc", page).then((res) => {
      //page change fetch prod again for this page
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="bestsellcontainer">
        {/* <h2 className="my-4 md:my-8 lg:mt-10 ml-10 text-2xl">   */}

        {/* <h2 className="headitemtext">New Arrivals</h2>
         */}

        <h2 className="headitemtext ">
          {" "}
          <span
            className="headitemtextright "
            onClick={() => history.push("/products/viewall/newarrival")}
          >
            {" "}
            View All
          </span>
          New Arrivals
        </h2>
        {loading ? (
          <LoadingCard count={loadercnt} /> //show 3 loading cards for products jab tak loading true he he load nhi hue
        ) : (
          //<div className="    h-96  flex flex-col lg:flex-row justify-between ml-10 mr-10 my-10 lg:my-0">

          <div className="bestsellitemdiv">
            {products.map((product) => (
              //   <div key={product._id} className="    h-80 w-52">
              <div
                key={product._id}
                className="bestsellitem"
                type={"newarrival"}
              >
                <ProductCardNew product={product} type="newarriv" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            // showQuickJumper
            // hideOnSinglePage
            // simple
            // showTotal={(total, range) =>
            //   `${range[0]}-${range[1]} of ${total} items`
            // }
            showSizeChanger={false}
            current={page}
            //total={Math.round((productsCount / 10) * 10)}
            total={Math.round(productsCount / 4) * 10}
            // total={productsCount}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};
export default NewArrivals;
