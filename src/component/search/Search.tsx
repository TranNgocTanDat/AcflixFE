import {  useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./style.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Khởi tạo useNavigates

  const handleSearch = () => {
    navigate(`/result?query=${searchTerm}`); // Điều hướng sang trang SearchResults với query
  };
  
  // Store value search and result search
  const [searchTerm, setSearchTerm] = useState<string>("");

 


  return (
    <>
      <div className="search-box f_flex">
        <input
          type="text"
          placeholder="Tìm kiếm trò chơi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
        />
        <FaSearch className="iconSearch" onClick={handleSearch} />
      </div>
      
    </>
  );
};
export default Search;
