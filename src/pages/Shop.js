import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
  getProductssort,
  getProductssortandfilter,
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

import { Fragment } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { getProducts, getProductsCount } from "../functions/product";

import { Pagination } from "antd";

import { Link } from "react-router-dom";
import { useIsMount } from "./useIsMount";
import LoadingCard from "../components/cards/LoadingCardhoriz";
import "./index.css";

//after typing any product in search comes to shop page

const { SubMenu, ItemGroup } = Menu;
const { Item } = Menu;
const Shop = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pricechanged, setPricechanged] = useState(false);
  const [pricechangedstopped, setPricechangedstopped] = useState(false);

  const [ok, setOk] = useState(false);
  // (true);
  const [found, setfound] = useState(false);
  const [categories, setCategories] = useState([]);

  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const isMount = useIsMount();

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 480px)").matches
  );

  useEffect(() => {
    window.matchMedia("(min-width: 480px)").addEventListener("change", (e) => {
      console.log("matches size changes", e.matches);
      setMatches(e.matches);
    });
  }, []);

  //const [searchParams, setSearchParams] = usesearch;

  //const sterm = searchParams.get("price") || "";

  const [nums, setNums] = useState([
    { id: 1, starNum: 5 },
    { id: 2, starNum: 4 },
    { id: 3, starNum: 3 },
    { id: 4, starNum: 2 },
    { id: 5, starNum: 1 },
  ]);
  const [starNumbers, setStarNumbes] = useState([]);

  useEffect(() => {
    console.log("ccc", starNumbers);
  }, [starNumbers]);

  const handleStarClick2 = (num) => {
    let inTheState = [...starNumbers];
    let foundInState = inTheState.indexOf(num);
    if (foundInState === -1) {
      inTheState.push(num);
    } else {
      inTheState.splice(foundInState, 1); //if already pres this no remove it/uncheck it
    }

    setPage(1);
    setStarNumbes(inTheState);
    // fetchProducts({ stars: inTheState }); //detch based on this star
  };

  const [brands, setBrands] = useState([
    "Acer",
    "Adidas",
    "Allen Solly",
    "American Tourister",
    "Apple",
    "Apsara",
    "Arrow",
    "Bajaj",
    "BoAt",
    "Boniry",
    "Campus",
    "Casio",
    "Cello",
    "Classmate",
    "Dove",
    "Engage",
    "FACTOR",
    "Fastrack",
    "Fogg",
    "GRAPHENE",
    "HIRNAYA",
    "HP",
    "JBL",
    "John Jacobs",
    "L'Oreal Paris",
    "Lenovo",
    "Levi's",
    "Luxor",
    "Mamaearth",
    "Minimalist",
    "Nataraj",
    "Neutrogena",
    "Nike",
    "OnePlus",
    "Peter England",
    "Puma",
    "Realme",
    "Red Tape",
    "Reynolds",
    "ROZEN 47",
    "Safari",
    "Samsung",
    "Skullcandy",
    "Sony",
    "Sparx",
    "Storio",
    "The Derma",
    "TIMEX",
    "Villain",
    "Vincent",
    "Wild Stone",
    "worison",
  ]);

  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
    "Orange",
    "Grey",
    "Green",
  ]);

  const [wishlistt, setWishlist] = useState([]);
  const [iswishchange, setiswishchange] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  let dispatch = useDispatch();

  let { search, user, userwishlist } = useSelector((state) => ({ ...state })); // new search reducer to hold state of curr search text
  const { text } = search;

  console.log("wishlistt set value", wishlistt);
  console.log("userwishlist ", userwishlist);

  //const mysearch = useLocation().search;

  //const catmap = new Map();

  let mp1 = new Map();
  if (localStorage.myMap1 !== undefined)
    mp1 = new Map(JSON.parse(localStorage.myMap1));

  const [catmap1, setCatmap1] = useState(mp1);

  let mp2 = new Map();
  if (localStorage.myMap2 !== undefined)
    mp2 = new Map(JSON.parse(localStorage.myMap2));
  const [catmap2, setCatmap2] = useState(mp2);

  const searchParams = new URLSearchParams(useLocation().search);
  const av = searchParams.get("page");
  const ap = searchParams.get("sort");
  const ac = searchParams.get("color");
  const ab = searchParams.get("brand");
  const as = searchParams.get("shipping");
  const si = [...searchParams.getAll("cat")];
  const si2 = [...searchParams.getAll("star")];

  const pf = searchParams.get("pricefrom");
  const pt = searchParams.get("priceto");

  console.log("siiiiiiiiiii", si);
  console.log("siiiiiiiiiii", si2);
  console.log("siiiiiiiiiiimp1", catmap1);
  console.log("siiiiiiiiiiimp2", catmap2);
  console.log(av);
  console.log(ap);
  console.log(ac);
  console.log(ab);
  console.log(as);
  console.log(si);
  console.log(si2);
  console.log(pf);
  console.log(pt);

  // let sinew = [];
  // si.length &&
  //   catmap2.size &&
  //   si.forEach((c) => {
  //     sinew.push(catmap2.get(c).toString());
  //     console.log("ss", c);
  //     console.log("ss", catmap2.get(c));
  //   });
  // console.log("siiiiiiiiiiinew", sinew);

  let xn = [1, 2, 3];

  const [categoryIds, setCategoryIds] = useState([]);

  const [price, setPrice] = useState(pf || pt ? [pf, pt] : [0, 0]);

  console.log("catids", categoryIds);
  console.log("catids starids", starNumbers);

  const [shipping, setShipping] = useState(as == null ? "" : as);
  const [color, setColor] = useState(ac == null ? "" : ac);
  const [brand, setBrand] = useState(ab == null ? "" : ab);
  const [page, setPage] = useState(av == null ? 1 : av);
  const [current, setCurrent] = useState(ap == null ? "PriceHigh" : ap); //intially he values null nothing in param so take defalut
  //after refresh have values in url will take take that

  //now on fresh load curr is price high and page=1

  // console.log("url paaaiui", searchParams);
  // console.log("url paaaiui", searchParams.get("page"));
  searchParams.set("sort", current);
  searchParams.set("page", page);

  useEffect(() => {
    console.log("priceccc", price);

    let currentUrlParams = new URLSearchParams(window.location.search);

    if (!isMount) {
      const pricefrom = searchParams.get("pricefrom");
      const priceto = searchParams.get("priceto");

      console.log("siinow", pricefrom);
      console.log("siinow", priceto);

      console.log("siinowcat", price);

      if (price[1] != 0) {
        // console.log("mycate len mp1", catmap1);
        // console.log("mycate len mp2", catmap2);

        // for (let i = 0; i < si.length; i++) {
        //   let sid = si[i];
        //   if (!starNumbers.includes(sid)) {
        //     currentUrlParams.delete("star", si[i]);
        //   }
        // }

        // if (pricefrom != price[0]) {
        currentUrlParams.delete("pricefrom");
        // }
        // if (priceto != price[1]) {
        currentUrlParams.delete("priceto");
        // }

        currentUrlParams.append("pricefrom", price[0]);
        currentUrlParams.append("priceto", price[1]);
        // for (let i = 0; i < starNumbers.length; i++) {
        //   let str = starNumbers[i];

        //   if (!si.includes(str)) {
        //     currentUrlParams.append("star", str);
        //     // console.log("mycat", categoryIds[i]);
        //     // console.log("mycat", catmap1.get(categoryIds[i]));
        //   }
        // }
      }

      //  const intervalId = setInterval(() => {
      history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
      //  }, 1000);
      //  return () => clearInterval(intervalId);
    }
  }, [price]);

  useEffect(() => {
    console.log("useffect126");
    const sii = [...searchParams.getAll("star")];
    let siinew = [];
    sii.forEach((c) => {
      siinew.push(parseInt(c, 10));
    });

    // setStarNumbes(siinew);
    //console.log("after setting star numbers", siinew);

    console.log("useffect126");
    const si = [...searchParams.getAll("cat")];
    let sinew = [];
    si.forEach((c) => {
      sinew.push(catmap2.get(c));
    });
    // setCategoryIds(sinew);

    setTimeout(() => {
      if (isMount) {
        console.log("hitting first mount");
        console.log(sii);
        console.log(siinew);
        console.log(sinew);
        console.log(sinew);

        // setStarNumbes(siinew);
        // setCategoryIds(sinew);
      } else {
        console.log("hitting secmount");
        console.log(sii);
        console.log(siinew);
        console.log(sinew);
        console.log(sinew);
        setStarNumbes(siinew);
        setCategoryIds(sinew);
      }
    }, 200);
  }, [catmap1, catmap2]);

  useEffect(() => {
    // if (isMount) {
    // }
  }, []);

  // useEffect(() => {
  //   console.log("ccccccccid changed", categoryIds);

  //   if (categoryIds.length == 0) {
  //     //setCategoryIds([651a84c21a08f53c58229efe, 65031cc044ec934424da3d7e]);
  //     console.log("ccccccccid changed inside", categoryIds);
  //   }
  // }, [categoryIds]);

  useEffect(() => {
    //window.scrollTo({ top: 0 });

    document.body.scrollTo({ top: 0 });
  }, [page]);

  useEffect(() => {
    let currentUrlParams = new URLSearchParams(window.location.search);

    console.log("mountttttt", isMount); //first time render mount true,  then ater that all rendeer false

    //console.log("mycate len", catmap1.size);

    //console.log("url paaa", currentUrlParams);

    // console.log("cur useffect124", current);

    console.log("renderfirst");
    console.log("renderfirstc", current + "ff");
    console.log("renderfirstp", page);
    console.log("renderfirstrendersec");
    currentUrlParams.set("sort", current);
    currentUrlParams.set("page", page);

    if (color != "") currentUrlParams.set("color", color);
    if (brand != "") currentUrlParams.set("brand", brand);
    if (shipping != "") currentUrlParams.set("shipping", shipping);

    console.log("abhi cat ids", categoryIds);

    if (!isMount) {
      //first tim render do nothing
      // second time se set only in url

      console.log("mountttttt true tha first time then set categ val", isMount);

      const si = [...searchParams.getAll("cat")];

      console.log("siinow", si);
      console.log("siinowcat", categoryIds);

      if ((categoryIds.length != 0 || si.length != 0) && catmap2.size != 0) {
        console.log("mycate len mp1", catmap1);
        console.log("mycate len mp2", catmap2);

        for (let i = 0; i < si.length; i++) {
          let catid = catmap2.get(si[i]);
          if (!categoryIds.includes(catid)) {
            currentUrlParams.delete("cat", si[i]);
          }
        }

        for (let i = 0; i < categoryIds.length; i++) {
          let catstr = catmap1.get(categoryIds[i]);

          if (!si.includes(catstr)) {
            currentUrlParams.append("cat", catstr);
            console.log("mycat", categoryIds[i]);
            console.log("mycat", catmap1.get(categoryIds[i]));
          }
        }

        //params.append("foo", "baz");
      }
    }
    //currentUrlParams.set("color", color);

    history.push(window.location.pathname + "?" + currentUrlParams.toString());

    // searchParams.set("sort", current);
    // searchParams.set("page", page);
    // console.log("url paaa", currentUrlParams);

    // if (!isMount) {  //first tim render nothing to set on url
    // // currentUrlParams.set("sort", current);
    // // currentUrlParams.set("page", page);

    // }
  }, [page, current, color, brand, shipping, categoryIds]);

  useEffect(() => {
    let currentUrlParams = new URLSearchParams(window.location.search);

    if (!isMount) {
      const si = [...searchParams.getAll("star")];

      console.log("siinow", si);
      console.log("siinowcat", starNumbers);

      if (starNumbers.length != 0 || si.length != 0) {
        // console.log("mycate len mp1", catmap1);
        // console.log("mycate len mp2", catmap2);

        for (let i = 0; i < si.length; i++) {
          let sid = si[i];
          if (!starNumbers.includes(sid)) {
            currentUrlParams.delete("star", si[i]);
          }
        }

        for (let i = 0; i < starNumbers.length; i++) {
          let str = starNumbers[i];

          if (!si.includes(str)) {
            currentUrlParams.append("star", str);
            // console.log("mycat", categoryIds[i]);
            // console.log("mycat", catmap1.get(categoryIds[i]));
          }
        }
      }
    }

    history.push(window.location.pathname + "?" + currentUrlParams.toString());
  }, [starNumbers, current]);

  useEffect(() => {
    // fetch categories
    //cart1 = JSON.parse(localStorage.getItem("cart"));

    //map = new Map(JSON.parse(localStorage.myMap));

    // if (localStorage.myMap1) {
    //   // let mycatmap11 = JSON.parse(localStorage.getItem("mycatmap11"));
    //   setCatmap1(new Map(JSON.parse(localStorage.myMap1)));
    // }
    // if (localStorage.myMap2) {
    //   // let mycatmap22 = JSON.parse(localStorage.getItem("mycatmap22"));
    //   setCatmap2(new Map(JSON.parse(localStorage.myMap2)));
    // }

    // if (isMount) {
    // if (localStorage.myMap1 == undefined && localStorage.myMap2 == undefined) {

    if (isMount) {
      getCategories().then((res) => {
        setCategories(res.data);
        console.log("my categ useffect123", res.data);

        //let mp = res.data;

        const mycatmap1 = new Map();
        const mycatmap2 = new Map();

        res.data.map((c) => {
          mycatmap1.set(c._id, c.name);
          mycatmap2.set(c.name, c._id);
        });
        //setCatmap(nextMap)

        setCatmap1(new Map(mycatmap1));
        setCatmap2(new Map(mycatmap2));

        // localStorage.setItem("mycatmap11", JSON.stringify(mycatmap1));
        // localStorage.setItem("mycatmap22", JSON.stringify(mycatmap2));
        localStorage.myMap1 = JSON.stringify(Array.from(mycatmap1));
        localStorage.myMap2 = JSON.stringify(Array.from(mycatmap2));

        // mp.map(
        //   (c) => {
        //     catmap.set(c._id, c.name);
        //     console.log("kv", c._id);
        //     console.log("kv", c.name);
        //   }

        //   // {c.name}
        // );
        // console.log("mycate len", catmap1);
        // console.log("mycate len", catmap1.size);

        // //catmap.get("apples");
        // for (const x of catmap1.keys()) {
        //   console.log("cat keys", x);
        //   console.log("cat keys ki val", catmap1.get(x));
        // }

        // for (const x of catmap1.values()) {
        //   console.log("cat val", x);
        // }
      }); //fetach and store in arr
    }

    // fetch subcategories
    getSubs().then((res) => setSubs(res.data)); //fetch and store in arr one time only for use in future
  }, []);

  useEffect(() => {
    if (isMount) {
      loadWishlist();
      console.log("called from here 1");
    }
  }, []);

  useEffect(() => {
    console.log("change hua kya", iswishchange);
    // history.listen(() => {
    //   console.log("away from shop is wisshchan2", iswishchange);
    //   if (iswishchange) {
    //     loadWishlist();
    //   }
    // });
    loadWishlist();
    console.log("called from here 2");
  }, [iswishchange, user]);

  // useEffect(() => {
  //   getProductsCount().then((res) => setProductsCount(res.data));
  // }, []);

  // useEffect(() => {
  //   console.log("change hua kya", iswishchange);
  //   history.listen(() => {
  //     console.log("away from shop is wisshchan13", iswishchange);

  //     if (isMount) {
  //       loadWishlist();
  //     } else if (iswishchange) {
  //       console.log(
  //         "away from shop is wisshchan13 api hit ready",
  //         iswishchange
  //       );
  //       loadWishlist();
  //     }
  //   });
  // });

  // useEffect(() => {
  //   if (
  //     (userwishlist.data !== undefined && !userwishlist.data.wishlist.length) ||
  //     !localStorage.getItem("wishlist")
  //   ) {
  //     console.log("loading wishlist again2");
  //     loadWishlist();
  //   }
  //   // console.log("ll", userwishlist);
  //   // setWishlist(userwishlist.data.wishlist);
  //   //
  //   console.log("lll", wishlistt);
  // }, [user]);

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

  useEffect(() => {
    console.log("hit prod api1111111111111111");

    //getProductsCount().then((res) => setProductsCount(res.data.total));
    let mypage = page;
    if (!isMount) {
      //ismount=true   first time render
      setPage(1); //ismount=false  not first time render   then only set to 1, else if url me kuch hoga to first time us page no ko lega

      mypage = 1;
    }

    let inTheState = categoryIds;
    let mycolor = color;

    let myshipping = shipping;
    let mybrand = brand;

    let mystarNumbers = starNumbers;

    let mypricechanged = pricechanged;
    let mytext = text;
    //let mystarNumbers=starNumbers

    let myprice = price;

    if (!isMount) {
      console.log("hit prod api11111111111111113719");
      switch (current) {
        case "MostSold":
          return loadAllProductssortandfilter(
            "sold",
            "desc",
            mypage,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );
        case "Latest":
          return loadAllProductssortandfilter(
            "createdAt",
            "desc",
            mypage,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );
        case "PriceHigh":
          return loadAllProductssortandfilter(
            "price",
            "desc",
            mypage,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );
        case "PriceLow":
          return loadAllProductssortandfilter(
            "price",
            "asc",
            mypage,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );

        default:
          break;
      }
    }
  }, [current]);

  useEffect(() => {
    console.log("price change hit prod api12222222222222222 hit ", categoryIds);
    console.log(
      "price change hit prod api12222222222222222 hit productsCount ",
      productsCount
    );

    //getProductsCount().then((res) => setProductsCount(res.data.total));
    //let inTheState = ["650304038f2c2e4038b13fa5", "650315956293e62fec9549b6"];
    let inTheState = categoryIds;
    let mycolor = color;
    let myshipping = shipping;
    let mybrand = brand;
    let mystarNumbers = starNumbers;
    let mypricechanged = pricechanged;
    let myprice = price;
    let mytext = text;
    console.log("catiddd1", categoryIds);
    console.log("catiddd2", color);
    console.log("catiddd3", shipping);
    console.log("catiddd4", brand);
    console.log("catiddd5", starNumbers);
    console.log("catiddd6", pricechanged);
    console.log("catiddd7", price);
    console.log("catiddd8", text);

    console.log("catidddfwrbk");

    console.log("catiddd11", page);
    console.log("catiddd22", color);
    console.log("catiddd33", color);
    console.log("catiddd44", brand);
    console.log("catiddd55", shipping);
    console.log("catiddd66", starNumbers);
    console.log("catiddd77", pricechangedstopped);
    console.log("catiddd88", text);

    // page,
    // categoryIds,
    // color,
    // brand,
    // shipping,
    // starNumbers,
    // pricechangedstopped,
    // text,

    //history.push("/shop/?colr=blue");

    console.log("bbbb is mount", isMount);
    console.log("bbbb is si .length", si.length);
    console.log("bbbb is si2.length", si2.length);

    // if (isMount && (si.length || si2.length)) {
    if (isMount) {
      //  "bbbb didn't hit first time coz  cat or starnum was in url will hit second time after map set"
      console.log("bbbb didn't hit first time  ");
    } else {
      switch (current) {
        case "MostSold":
          return loadAllProductssortandfilter(
            "sold",
            "desc",
            page,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );
        case "Latest":
          return loadAllProductssortandfilter(
            "createdAt",
            "desc",
            page,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );
        case "PriceHigh":
          return loadAllProductssortandfilter(
            "price",
            "desc",
            page,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );
        case "PriceLow":
          return loadAllProductssortandfilter(
            "price",
            "asc",
            page,
            inTheState,
            mycolor,
            mybrand,
            myshipping,
            mystarNumbers,
            mypricechanged,
            myprice,
            mytext
          );

        default:
          break;
      }
    }
  }, [
    page,
    categoryIds,
    color,
    brand,
    shipping,
    starNumbers,
    pricechangedstopped,
    text,
  ]);

  const loadAllProductssortandfilter = (
    sort,
    order,
    page,
    catlist,
    color,
    brand,
    shipping,
    starNumbers,
    mypricechanged,
    myprice,
    mytext
  ) => {
    setLoading(true);
    console.log("hit prod api3", sort);
    console.log("hit prod api3", order);
    console.log("hit prod api3", page);
    console.log("hit prod api3", catlist);
    console.log("hit prod api3", color);
    console.log("hit prod api3", brand);
    console.log("hit prod api3", shipping);
    console.log("hit prod api3", starNumbers);
    console.log("hit prod api3", mypricechanged);
    console.log("hit prod api3", myprice);
    console.log("hit prod api3", mytext);
    //setProducts([]);
    getProductssortandfilter(
      sort,
      order,
      page,
      catlist,
      color,
      brand,
      shipping,
      starNumbers,
      mypricechanged,
      myprice,
      mytext
    ).then((res) => {
      //page change fetch prod again for this page
      console.log("bbbbbbbbb" + page, res.data);
      console.log("bbbbbbbbb" + page, res);
      console.log("bbbbbbbbb" + page, res.data.total);
      //setProducts([]);
      setProductsCount(res.data.total);
      setProducts(res.data.products);
      const cv = Math.round(productsCount / 8) * 10;
      console.log("bbbbbbbbbcv" + page, cv);
      const cv2 = Math.round(res.data.total / 8) * 10;
      console.log("bbbbbbbbbcv2" + page, cv2);
      setLoading(false);
    });
  };

  const loadWishlist = () => {
    console.log("ZZZ", wishlistt);

    console.log("called from here 11 login?");
    if (user && user.token) {
      console.log("called from here 11 login? yes");
      getWishlist(user.token).then((res) => {
        console.log("gg wishlis", res);
        console.log("gg wishlisvv", res.data.wishlist);

        console.log("ZZZ", wishlistt);
        console.log("ZZZuser", userwishlist);

        console.log("called from here 11", res.data.wishlist);

        setWishlist(res.data.wishlist);

        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(res));
        }

        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: res,
        });

        console.log(
          "called from here 11 data in db",
          JSON.parse(localStorage.getItem("wishlist"))
        );
        console.log("called from here 11 data in redux", userwishlist);
        console.log("called from here 11 data in state", wishlistt);

        // if (localStorage.getItem("wishlist")) {
        //   cart = JSON.parse(localStorage.getItem("cart")); //local storage se cart nikal liya
        // }
      });
    }
  };

  useEffect(() => {
    console.log(
      "called from here 11 data in db ue",
      JSON.parse(localStorage.getItem("wishlist"))
    );
    console.log("called from here 11 data in redux ue", userwishlist);
    console.log("called from here 11 data in state ue", wishlistt);

    // if (user) {
    if (isMount) {
    } else {
      setfound(true);
      console.log(
        "called from here 11 data in wislist found now in state finally",
        wishlistt
      );
    }
    // } else {
    //   setfound(true);
    // }
  }, [wishlistt, userwishlist]);

  useEffect(() => {
    console.log("mera price", price);
  }, [price]);

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
    console.log("hit prod api2 argument", arg);
    fetchProductsByFilter(arg).then((res) => {
      console.log("d1", res.data);
      console.log("d2", res);
      setProducts(res.data);
    });
  };

  // 2. load products on user search input
  // useEffect(() => {
  //   console.log("hit prod api5");
  //   const delayed = setTimeout(() => {
  //     console.log("yy9");
  //     //fetchProducts({ query: text });

  //   }, 700);
  //   return () => clearTimeout(delayed);
  // }, [text]); //run on change of text in real time with wait of 3 msec

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

  const handleSlider2 = (value) => {
    console.log("mera price", price);
    setPrice(value);
    const timeoutId = setTimeout(() => {
      setPricechanged(true);

      //setSearchParams({ price });
    }, 1000);
    return () => clearTimeout(timeoutId);
  };

  const handleSlider3 = (value) => {
    console.log("price change onafter stopped", price);

    setPricechangedstopped(!pricechangedstopped);
    // setPrice(value);
    // const timeoutId = setTimeout(() => {
    //   setPricechanged(true);

    //   //setSearchParams({ price });
    // }, 1000);
    // return () => clearTimeout(timeoutId);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    // {
    //   console.log("catids in show cat", categoryIds);
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck2}
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
  // };

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
    // fetchProducts({
    //   category: ["650304038f2c2e4038b13fa5", "650315956293e62fec9549b6"],
    // }); //now fetch products based on these new checked categ
  };

  const handleCheck2 = (e) => {
    // reset

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

    setPage(1);
    setCategoryIds(inTheState); //update stored catid array in state
    // console.log(inTheState);
    console.log("yy7");
    // fetchProducts({
    //   category: ["650304038f2c2e4038b13fa5", "650315956293e62fec9549b6"],
    // }); //now fetch products based on these new checked categ
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

  const handleBrand2 = (e) => {
    setPage(1);
    setBrand(e.target.value);

    console.log("yy3");
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

  const clearfilters = () => {
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
    setShipping("");
    setStarNumbes([]);
    setPrice([0, 0]);

    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.delete("cat");
    currentUrlParams.delete("color");
    currentUrlParams.delete("brand");
    currentUrlParams.delete("shipping");
    currentUrlParams.delete("star");
    currentUrlParams.delete("pricefrom");
    currentUrlParams.delete("priceto");

    history.push(window.location.pathname + "?" + currentUrlParams.toString());

    // console.log("yy2");
    // fetchProducts({ color: e.target.value });
  };

  const handleColor2 = (e) => {
    //setColor(e.target.value);

    if (e.target.value === color) {
      setColor("");
    } else {
      setPage(1);
      setColor(e.target.value);
      //page=1;
    }

    console.log("yy2");
    //fetchProducts({ color: e.target.value });
  };

  // 7. show

  const showStars = () => (
    // <div className="pr-4 pl-4 pb-2">
    //   <Star    starClick={handleStarClick} numberOfStars={5} />
    //   <Star starClick={handleStarClick} numberOfStars={4} />
    //   <Star starClick={handleStarClick} numberOfStars={3} />
    //   <Star starClick={handleStarClick} numberOfStars={2} />
    //   <Star starClick={handleStarClick} numberOfStars={1} />
    // </div>

    <div className="pr-4 pl-4 pb-2">
      {nums.map((num) => (
        <Fragment key={num.id}>
          <Star
            starClick={() => handleStarClick2(num.starNum)}
            num={num}
            starEmptyColor={
              starNumbers.includes(num.starNum) ? "red" : "lightgrey"
            }
            editing={false}
          />
          <br />
        </Fragment>
      ))}
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
        onChange={handleBrand2}
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
        onChange={handleColor2}
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
        onChange={handleShippingchange2}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange2}
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

  const handleShippingchange2 = (e) => {
    setShipping(e.target.value);
    console.log("yy1");
  };

  return (
    <div className="container-fluid">
      {/* 1 row me 2 col      <div className="row">   
  col1 side bar        <div className="col-md-3  >      col2 all products      <div className="col-md-9"> 
   */}

      <div className="row">
        <div className="col-md-3 pt-2">
          <div className="row px-5 mt-2 -mb-4">
            <div className="float-left w-3/4">
              <p
                className="float-left "
                style={{ color: "black", fontSize: "16px" }}
              >
                Filters
              </p>
            </div>
            <div
              className="float-right w-1/4"
              style={{
                overflow: "hidden",
                // whiteSpace: "nowrap",
              }}
            >
              <p
                className="font-semibold   "
                style={{
                  color: "#5199DBFF",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={clearfilters}
              >
                Clear All
              </p>
            </div>
          </div>

          <hr />
          <Menu
            // defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]} //be default open rakhega menu
            // mode="vertical"
            //inlineCollapsed={true}

            // defaultOpenKeys={
            //   matches ? ["1", "2", "3", "4", "5", "6", "7"] : ["1"]
            // }
            defaultOpenKeys={matches && ["1", "2", "3", "6"]}
            mode="inline"
            // direction="rtl"
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
                  tipFormatter={(v) => `Rs ${v}`}
                  range
                  value={price}
                  onChange={handleSlider2} //for price based on range change
                  onAfterChange={handleSlider3}
                  max="60000"
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
            {/* <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            > */}
            {/* <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
              {showSubs()}
            </div> */}
            {/* </SubMenu> */}

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
            //  inlineCollapsed="true"
            onClick={handleClick}
            //    selectedKeys={ }
            mode="horizontal"
            selectedKeys={[current]}
            //  disabledOverflow="true"
            //colorFillContent="black"
            className=" ml-3 mr-3  mymenu"
          >
            <Item key="SortBy" style={{ pointerEvents: "none" }}>
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Sort By</Link>
            </Item>

            <Item key="PriceHigh">
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Price- High to Low</Link>
            </Item>
            <Item key="PriceLow">
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">Price- Low to High</Link>
            </Item>

            <Item
              key="MostSold"

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
          </Menu>

          {/* {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className=" "> </h4>
          )} */}

          {/* {products.length < 1 && <p>Finding products for you.. </p>} */}

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
            {(loading || (!found && user)) && <LoadingCard count={8} />}

            {(found || !user) &&
              !loading &&
              products.map((p) => (
                // <div key={p._id} className="col-md-2 mt-3 ">
                <div key={p._id} className="   mb-3 flex flex-col vvb bg-white">
                  {/* //ispresentinwish={ wishlistt.map((w) => ())} */}
                  <ProductCardNewHoriz
                    product={p}
                    listt={wishlistt}
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
                //   `${range[0]}-${range[1]} of ${productsCount} items`
                // }
                showSizeChanger={false}
                current={page}
                //total={Math.round((productsCount / 10) * 10)}
                total={Math.round(productsCount / 8) * 10}
                // total={productsCount}
                onChange={(value) => {
                  // setLoading(false);
                  setPage(value);
                }}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
