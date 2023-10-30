import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
  getProductssort,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "../../src/index.css";
import Star from "../components/forms/Star";
import ProductCardNew from "../../src/components/cards/ProductCardnew";
import ProductCardNewHoriz from "../components/cards/ProductCardNewHoriz";

import { getWishlist } from "../functions/user";

import { getProducts, getProductsCount } from "../functions/product";

import { Pagination } from "antd";

import { Link } from "react-router-dom";

import "./index.css";

//after typing any product in search comes to shop page

const { SubMenu, ItemGroup } = Menu;
const { Item } = Menu;
const Shop = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [current, setCurrent] = useState("HighRated");
  const [page, setPage] = useState(1);
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const [wishlistt, setWishlist] = useState([]);
  const [iswishchange, setiswishchange] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  let dispatch = useDispatch();

  let { search, user, userwishlist } = useSelector((state) => ({ ...state })); // new search reducer to hold state of curr search text
  const { text } = search;

  console.log("wishlistt set value", wishlistt);
  console.log("userwishlist ", userwishlist);

  useEffect(() => {
    console.log("change hua kya", iswishchange);
    // history.listen(() => {
    //   console.log("away from shop is wisshchan2", iswishchange);
    //   if (iswishchange) {
    //     loadWishlist();
    //   }
    // });
  }, [iswishchange]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  useEffect(() => {
    console.log("change hua kya", iswishchange);
    history.listen(() => {
      console.log("away from shop is wisshchan13", iswishchange);
      if (iswishchange) {
        console.log(
          "away from shop is wisshchan13 api hit ready",
          iswishchange
        );
        loadWishlist();
      }
    });
  });

  useEffect(() => {
    if (
      (userwishlist.data !== undefined && !userwishlist.data.wishlist.length) ||
      !localStorage.getItem("wishlist")
    ) {
      console.log("loading wishlist again2");
      loadWishlist();
    }
    // console.log("ll", userwishlist);
    // setWishlist(userwishlist.data.wishlist);
    //
    console.log("lll", wishlistt);
  }, [user]);

  const loadAllProducts = () => {
    console.log("hit prod api333");

    setProducts([]);
    // getProductssort("sold", "desc", page).then((res) => {
    //   //page change fetch prod again for this page
    //   console.log("bb" + page, res.data);
    //   setProducts(res.data);
    //   setLoading(false);
    // });
  };

  // useEffect(() => {
  //   console.log("hit prod api1");

  //   getProductsCount().then((res) => setProductsCount(res.data));

  //   switch (current) {
  //     case "HighRated":
  //       return loadAllProductssort("sold", "desc", page);
  //     case "Latest":
  //       return loadAllProductssort("createdAt", "desc", page);
  //     case "PriceHigh":
  //       return loadAllProductssort("price", "desc", page);
  //     case "PriceLow":
  //       return loadAllProductssort("price", "asc", page);

  //     default:
  //       break;
  //   }
  // }, [current]);

  useEffect(() => {
    console.log("hit prod api1");

    getProductsCount().then((res) => setProductsCount(res.data));

    setPage(1);

    switch (current) {
      case "HighRated":
        return loadAllProductssort("sold", "desc", 1);
      case "Latest":
        return loadAllProductssort("createdAt", "desc", 1);
      case "PriceHigh":
        return loadAllProductssort("price", "desc", 1);
      case "PriceLow":
        return loadAllProductssort("price", "asc", 1);

      default:
        break;
    }
  }, [current]);

  useEffect(() => {
    console.log("hit prod api1");

    getProductsCount().then((res) => setProductsCount(res.data));

    switch (current) {
      case "HighRated":
        return loadAllProductssort("sold", "desc", page);
      case "Latest":
        return loadAllProductssort("createdAt", "desc", page);
      case "PriceHigh":
        return loadAllProductssort("price", "desc", page);
      case "PriceLow":
        return loadAllProductssort("price", "asc", page);

      default:
        break;
    }
  }, [page]);

  const loadAllProductssort = (sort, order, page) => {
    console.log("hit prod api3", sort);
    console.log("hit prod api3", order);
    console.log("hit prod api3", page);
    //setProducts([]);
    getProductssort(sort, order, page).then((res) => {
      //page change fetch prod again for this page
      console.log("bb" + page, res.data);
      //setProducts([]);
      setProducts(res.data);
      //setLoading(false);
    });
  };

  const loadWishlist = () => {
    console.log("ZZZ", wishlistt);
    if (user && user.token) {
      getWishlist(user.token).then((res) => {
        console.log("gg wishlis", res);
        console.log("gg wishlisvv", res.data.wishlist);
        setWishlist(res.data.wishlist);
        console.log("ZZZ", wishlistt);
        console.log("ZZZuser", userwishlist);

        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(res));
        }
        console.log("ZZZ", JSON.parse(localStorage.getItem("wishlist")));

        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: res,
        });

        // if (localStorage.getItem("wishlist")) {
        //   cart = JSON.parse(localStorage.getItem("cart")); //local storage se cart nikal liya
        // }
      });
    }
  };

  useEffect(() => {
    // fetch categories
    getCategories().then((res) => setCategories(res.data)); //fetach and store in arr
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data)); //fetch and store in arr one time only for use in future
  }, []);

  const hello = () => {
    console.log("setting wishchange", iswishchange);
    if (!iswishchange) {
      let cc = iswishchange;
      console.log("cc", cc);
      setiswishchange(1);

      console.log("setted wishchange ko true", iswishchange);
    }
  };
  const handleClick = (e) => {
    // console.log(e.key);
    //e.preventDefault();
    setCurrent(e.key);
  };

  const fetchProducts = (arg) => {
    console.log("hit prod api2");
    fetchProductsByFilter(arg).then((res) => {
      console.log("d1", res.data);
      console.log("d2", res);
      setProducts(res.data);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    console.log("hit prod api5");
    const delayed = setTimeout(() => {
      console.log("yy9");
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 100);
    return () => clearTimeout(delayed);
  }, [text]); //run on change of text in real time with wait of 3 msec

  // 3. load products based on price range
  useEffect(() => {
    console.log("hit prod api6");
    console.log("ok to request");
    console.log("yy8"); ///error here
    //fetchProducts({ price });
  }, [ok]); //run again when ok change

  const handleSlider = (value) => {
    console.log("hit prod api7");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" }, //search wala filter diable now by resetting search value
    });

    // reset all other filters
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setTimeout(() => {
      setOk(!ok); //on/off price filter
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)} //jomsi checked he add in catid list
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds]; //curr catgid in list
    let justChecked = e.target.value; //just chrckrg esli id
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1   check if was already there

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      //if no add it
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1); //if yes remove it
    }

    setCategoryIds(inTheState); //update stored catid array in state
    // console.log(inTheState);
    console.log("yy7");
    fetchProducts({ category: inTheState }); //now fetch products based on these new checked categ
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    console.log("yy6");
    fetchProducts({ stars: num }); //detch based on this star
  };
  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    console.log("yy4");
    fetchProducts({ sub });
  };
  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    console.log("yy3");
    fetchProducts({ brand: e.target.value });
  };

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    console.log("yy2");
    fetchProducts({ color: e.target.value });
  };

  // 7. show

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  //products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    console.log("yy1");
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      {/* 1 row me 2 col      <div className="row">   
  col1 side bar        <div className="col-md-3  >      col2 all products      <div className="col-md-9"> 
   */}

      <div className="row">
        <div className="col-md-3 pt-2">
          {/* <h4>Search/Filter</h4> */}
          <hr />

          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]} //be default open rakhega menu
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider} //for price based on range change
                  max="4999"
                />
              </div>
            </SubMenu>

            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        {/* // show all prodcuts store in setstate */}

        <div
          className="col-md-9 pt-2 "
          style={{ backgroundColor: "#F0F9FAFF" }}
        >
          <Menu
            onClick={handleClick}
            //    selectedKeys={ }
            mode="horizontal"
            selectedKeys={[current]}
            //colorFillContent="black"
            className=" ml-3 mr-3  mymenu"
          >
            <Item key="SortBy" style={{ pointerEvents: "none" }}>
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Sort By</Link>
            </Item>

            <Item
              key="HighRated"

              // style={{ marginRight: "145px", marginLeft: "40px" }}
            >
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Most Selling</Link>
            </Item>

            <Item
              key="Latest"
              //</Menu>onClick={console.log("latest hit ")
              //loadAllProductssort("createdAt", "desc", 1)
              // }
            >
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Latest</Link>
            </Item>

            <Item key="PriceHigh">
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Price- High to Low</Link>
            </Item>
            <Item key="PriceLow">
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Price- Low to High</Link>
            </Item>
          </Menu>

          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className=" "> </h4>
          )}

          {products.length < 1 && <p>Finding products for you.. </p>}

          {/* <div className="row pb-5 bg-gray-500 ">
            {products.map((p) => (
              // <div key={p._id} className="col-md-2 mt-3 ">
              <div key={p._id} className="bg-red-300 mb-40 mt-3">
                <ProductCardNew product={p} />
              </div>
            ))}
          </div> */}

          <div
            className="col   py-1  "
            // style={{ backgroundColor: "#F0F9FAFF" }}
          >
            {products.map((p) => (
              // <div key={p._id} className="col-md-2 mt-3 ">
              <div key={p._id} className="   mb-3 flex flex-col vvb bg-white">
                {/* //ispresentinwish={ wishlistt.map((w) => ())} */}
                <ProductCardNewHoriz
                  product={p}
                  listt={userwishlist}
                  iswishchange={iswishchange}
                  changewishset={hello}
                />
              </div>
            ))}
          </div>

          <div className="row mb-5">
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
                total={Math.round(productsCount / 8) * 10}
                // total={productsCount}
                onChange={(value) => setPage(value)}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
