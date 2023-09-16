import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

//History, location, and match are 3 props that each screen component gets
// history.push("/login"); // now we're in oldurlin history=localhost:3000  + /login

//history.push("/addToCart?quantity=99"). supplying additional data as query string parameters.
//location.search is the question mark and everything after it, in this case ?quantity=99

//use in match is the params property, which contains all the parameters in URL.
//For example, you might be in localhost:3000/student/student0098.    match.params.id;

//{"slug":"macbook-pro112"}  match.params

//values
//{"title":"","description":"","price":"","category":"","subs":[],"shipping":"","quantity":"","images":[],"colors":["Black","Brown","Silver","White","Blue"],"brands":["Apple","Samsung","Microsoft","Lenovo","ASUS"],"color":"","brand":""}

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // router
  ///admin/product/:slug
  const { slug } = match.params; //previous url pe pass hua hoga slug params me us se fetch

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log(slug);
      console.log(p);
      setValues({ ...values, ...p.data }); // 1 load single proudct

      getCategorySubs(p.data.category._id).then((res) => {
        // 2 load single product category subs
        setSubOptions(res.data); // on first load, show default subs
      });

      //obj way me hoga so make it in array to work it with antd
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); // set to new sub arr
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs; //update subs with latest subs arr , before sending in values
    values.category = selectedCategory ? selectedCategory : values.category; // same for category  if not updated old vali hi rhi hogi categ

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //keep on updating values on change
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value); //new category set

    getCategorySubs(e.target.value).then((res) => {
      //fetch new subs list for this categ
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGORY values.category", values.category);

    // if user clicks back to the original category
    // show its sub categories in default jo pehle selected thi vhi wali again se
    if (values.category._id === e.target.value) {
      loadProduct(); //again load this prod comp
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        {/* 
        {JSON.stringify(values)} */}
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}
          {/* 
          {JSON.stringify(match.params)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          {/* //sending props in create form through this page including values handlers*/}
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
