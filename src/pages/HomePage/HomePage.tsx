import { useEffect, useState } from "react";
import { Film } from "../../api/fake-api";
import Intro from "../../component/poster/intro";
import SliderHome from "../../component/sliderShow/Slider";
import "./style.css";
import {
  filmFindNewReleased,
  filmHaveNewEpisodes,
} from "../../services/filmApi";
import CategoryDetails from "../../model/CategoryDetails";
import { findCategoryDetails } from "../../services/categoryApi";

const HomePage = () => {
  const [newReleased, setNewReleased] = useState<Film[]>([]); // create state to store data new released
  const [newEpisodes, setNewEpisodes] = useState<Film[]>([]); // create state to store data new episodes
  const [categries, setcategries] = useState<CategoryDetails[]>([]); // create state to store data categories

  useEffect(() => {
    filmFindNewReleased(10)
      .then((response) => {
        setNewReleased(response.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // new episodes
    filmHaveNewEpisodes()
      .then((response) => {
        setNewEpisodes(response.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // categories
    categries.forEach((category) => {
      findCategoryDetails(10)
        .then((response) => {
          setcategries(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  }, []);

  return (
    <div className="container">
      <Intro />
      {/* {categries.map((category) => (
        <div className="slide top10">
          <div className="slide-title">{category.name}</div>
          <SliderHome dataFilm={newEpisodes} />
        </div>
      ))} */}
      <div className="slide top10">
        <div className="slide-title">Danh sách top 10</div>
        <SliderHome dataFilm={newReleased} />
      </div>
      <div className="slide ">
        <div className="slide-title">Danh sách top 10</div>
        <SliderHome dataFilm={newEpisodes} />
      </div>
      {/* <div className="slide">
        <div className="slide-title">Phim lẻ</div>
        <SliderHome dataFilm={dataFilm} error={error} />
      </div>
      <div className="slide">
        <div className="slide-title">Phim bộ</div>
        <SliderHome dataFilm={dataFilm} error={error} />
      </div>
      <div className="slide">
        <div className="slide-title">Phim kinh dị</div>
        <SliderHome dataFilm={dataFilm} error={error} />
      </div>
      <div className="slide">
        <div className="slide-title">Danh sách yêu thích</div>
        <SliderHome dataFilm={dataFilm} error={error} />
      </div> */}
    </div>
  );
};

export default HomePage;
