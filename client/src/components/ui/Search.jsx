import React from "react";
import "../../style/components/ui/Search.scss";
import { BsSearch } from "react-icons/bs";

function Search() {
  return (
    <div className="Search">
      <h3>✨ 함께 나누고 배우며 성장해요 ✨</h3>
      <form action="">
        <input type="search" placeholder="키워드를 검색해보세요" />
        <BsSearch className="icon-search" />
      </form>
    </div>
  );
}

export default Search;
