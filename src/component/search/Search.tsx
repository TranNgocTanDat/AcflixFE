import { FormEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Khởi tạo useNavigates

  // Store value search and result search
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <>
      <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-box f_flex">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm bộ phim..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
        />
        <button type="submit" className="search-button">
          <FaSearch className="iconSearch" />
        </button>
      </div>
      </form>
    </>
  );
};
export default Search;