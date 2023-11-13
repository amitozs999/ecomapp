import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value }, //set search val
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    // <div className="max-w-[50rem] w-full md:w-[90%] px-4 md:ltr:ml-4 md:rtl:mr-4 rounded-lg bg-slate-600/10 dark:bg-slate-800 flex items-center flex-grow">
    <div
      //  className="form-inline my-2 inputnounderline"
      // className="formlay"

      style={{
        backgroundColor: "rgba(235, 238, 243, 0.991)",
        //  width: "33%",
        //   height: "34px",
        marginTop: "0.5rem",
        //marginBottom: "auto",
        marginLeft: "auto",

        marginRight: "auto",
        width: "80%",
        height: "80%",
        borderRadius: "0.5em",
        // marginTop: "7px",
        // paddingBottom: "15px",
      }}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          // className="px-4 py-2 md:py-3 bg-transparent outline-none w-full "
          onChange={handleChange} //on change update search value in redux state
          type="search"
          value={text}
          //className="px-4 py-2 md:py-3 "
          // className="inputnounderline"

          style={{
            paddingLeft: "10px",
            width: "85%",
            height: "21px",
            //  marginBottom: "15px !important",
            marginLeft: "5px",
            marginTop: "7px",
            paddingTop: "5px",
            // fontSize: "8px",
            // display: "block",
            outline: "none",
            border: "none",
            color: "black",
            backgroundColor: "rgba(235, 238, 243, 0.991)",
          }}
          placeholder="Search Product"
        />

        <SearchOutlined
          //  style={{ fontSize: "150%" }}
          onClick={handleSubmit}
          style={{
            height: "23px",
            cursor: "pointer",
            fontSize: "110%",
            marginLeft: "10px",
            backgroundColor: "rgba(235, 238, 243, 0.991)",
            //padding: "4px",
            color: "black",
            // paddingBottom: "7px",
            // marginBottom: "5px",
            marginTop: "9px",
            marginRight: "5px",
            float: "right",
            width: "7%",
            //transform: "translateY(-100%)",
          }}
          className="pad-search"
        />
      </div>{" "}
    </div>
  );
};

export default Search;
