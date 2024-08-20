import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDatas from "../../api/useData";
import { Film } from "../../api/fake-api";
import FilmItem from "../FilmItem";

const Result: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const { dataFilm} = useDatas();
  const [searchResult, setSearchResult] = useState<Film[]>([]);

  useEffect(() => {
    if (query.trim() !== "") {
      const result = dataFilm.filter((film) =>
        film.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResult(result);
    }
  }, [query, dataFilm]);

  // Ở đây bạn có thể sử dụng query để tìm kiếm dữ liệu hoặc hiển thị kết quả tương ứng
  return (
    <div className="search-results">
      {searchResult.length > 0 ? (
        <div className="result-search">
          {searchResult.map((film) => (
            <FilmItem data={film} key={film.id} />
          ))}
        </div>
      ) : (
        <p>Không tìm thấy kết quả nào cho từ khóa: {query}</p>
      )}
    </div>
  );
};

export default Result;
