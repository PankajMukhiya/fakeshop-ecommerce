import React from "react";

const SearchBox = () => {
  return (
    <>
        <form className="d-flex" onSubmit={searchSubmitHandler}>
              <input
                className="form-control me-2 font-monospace"
                placeholder="Search a Product..."
                type="text"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
    </>
  );
};

export default SearchBox;
