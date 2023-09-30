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
    <form className="form-inline my-2 search" onSubmit={handleSubmit}>
      <input
        // className="px-4 py-2 md:py-3 bg-transparent outline-none w-full "
        onChange={handleChange} //on change update search value in redux state
        type="search"
        value={text}
        className="px-4 py-2 md:py-3 inputnounderline "
        placeholder="Search Product"
      />

      <SearchOutlined
        onClick={handleSubmit}
        style={{ cursor: "pointer" }}
        className="pad-search"
      />
    </form>
  );
};

export default Search;
