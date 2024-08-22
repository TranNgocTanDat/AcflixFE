import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Khởi tạo useNavigates

  // Store value search and result search
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      // Điều hướng đến trang kết quả mỗi khi giá trị tìm kiếm thay đổi
      navigate(`/result?query=${searchTerm}`);
    } else{
      navigate(`/`)
    }
  }, [searchTerm, navigate]);

  return (
    <>
      <div className="search-container">
        <div className="search-box f_flex">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm bộ phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
          />
          <FaSearch className="iconSearch" />
        </div>
      </div>
    </>
  );
};
export default Search;
