import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import ProductCardNew from "../cards/ProductCardnew";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("bb1");
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", page).then((res) => {
      console.log("bb" + page, res.data);
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container mt-32">
        <h2 className="my-4 md:my-8 lg:mt-10 ml-8  text-2xl">
          Popular Products
        </h2>
        {loading ? (
          <LoadingCard count={4} /> //show 3 loading cards for products jab tak loading true he he load nhi hue
        ) : (
          <div className=" bg-slate-400  h-96  flex flex-col lg:flex-row justify-between ml-10 mr-10 my-10 lg:my-0">
            {products.map((product) => (
              <div key={product._id} className="    h-80 w-52">
                <ProductCardNew product={product} />
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

export default BestSellers;
