import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilmItem from "../FilmItem";
import "./style.css";
import { searchFilm } from "../../services/filmApi";
import { Film } from "../../model/Film";

// Hàm chuẩn hóa chuỗi để loại bỏ dấu
const normalizeString = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
};

const Result: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [searchResult, setSearchResult] = useState<Film[]>([]);

  useEffect(() => {
    searchFilm(query).then((response) => {
      setSearchResult(response.items);
    });
  }, [query]);

  return (
    <div className="result">
      {searchResult.length > 0 ? (
        <div className="result-search">
          {searchResult.map((film) => (
            <div className="result-item">
              <FilmItem data={film} key={film.id} />
            </div>
          ))}
        </div>
      ) : (
        <p>Không tìm thấy kết quả nào cho từ khóa: {query}</p>
      )}
    </div>
  );
};

export default Result;
