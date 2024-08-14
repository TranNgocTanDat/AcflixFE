import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div className="search-box f_flex">
        <input
          type="text"
          placeholder="Tìm kiếm trò chơi..."
          value={search}
          onChange={handleSearch}
          ref={inputRef}
        />
        <FaSearch className="iconSearch" onClick={handleIconClick} />
      </div>
    </>
  );
};
export default Search;
