import { useEffect, useState } from "react";
import SliderHome from "../../component/sliderShow/Slider";
import "./style.scss";
import { Film } from "../../api/fake-api";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { filmFindNewReleased } from "../../services/filmApi";

const ListFilm = () => {
  const [newReleased, setNewReleased] = useState<Film[]>([]);
  const [listFilms, setListFilms] = useState<Film[]>([]);

  useEffect(() => {
    filmFindNewReleased(10)
      .then((response) => {
        setNewReleased(response.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header></Header>
      <div className="slide top10">
        <div className="slide-title">Phim nổi bật</div>
        <SliderHome dataFilm={newReleased} />
      </div>

      <div className="list-film">
        <div className="list-title">Danh sách phim</div>
        <div className="list">
          {listFilms.length > 0 ? (
            <div className="list-item"></div>
          ) : (
            <p>Không tìm thấy kết quả</p>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ListFilm;
