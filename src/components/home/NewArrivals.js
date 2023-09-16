import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
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
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* //bottom pagination page numbers */}
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={Math.round((productsCount / 3) * 10)}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;