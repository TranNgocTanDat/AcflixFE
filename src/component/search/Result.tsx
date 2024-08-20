import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDatas from "../../api/useData";
import { Film } from "../../api/fake-api";
import FilmItem from "../FilmItem";
import "./style.css";

// Hàm chuẩn hóa chuỗi để loại bỏ dấu
const normalizeString = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
};

const Result: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const { dataFilm } = useDatas();
  const [searchResult, setSearchResult] = useState<Film[]>([]);

  useEffect(() => {
    if (query.trim() !== "") {
      const normalizedQuery = normalizeString(query).toLowerCase();
      const result = dataFilm.filter((film) =>
        normalizeString(film.name).toLowerCase().includes(normalizedQuery)
      );
      setSearchResult(result);
    }
  }, [query, dataFilm]);

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

