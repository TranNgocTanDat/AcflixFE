import { useEffect, useState } from "react";

import "./style.scss";
import { Film } from "../../api/fake-api";

import { useParams } from "react-router-dom";
import { findCategoryById } from "../../services/categoryApi";

const ListFilm = () => {
  const [categriesById, setCategoriesById] = useState<Film[]>([]); // create state to store data categories by id
  const [films, setFilms] = useState<Film[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      findCategoryById(id, 10)
        .then((response) => {
          setCategoriesById(response.items); // Adjusted to use `response.data.items` based on typical API responses
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  return (
    <>
      <div>
        <h1>Thể loại: {id}</h1>
        <div className="film-list">
          {films.map((film) => (
            <div key={film.id} className="film-item">
              <h3>{film.name}</h3>
              <p>{film.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListFilm;
