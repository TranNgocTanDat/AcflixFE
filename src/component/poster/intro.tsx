// import ReactPlayer from "react-player";
import { Film } from "../../api/fake-api";
import useDatas from "../../api/useData";
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import "./style.css";
import { Link } from "react-router-dom";
import Search from "../search/Search";

const Intro = () => {
  const { dataFilm, error } = useDatas();

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        {dataFilm.map((film: Film) => (
          <div key={film.id} className="info">
            <div className="poster">
              {film.poster.length > 0 && (
                <div className="img-wrapper">
                  <img
                    src="https://rotoscopers.com/wp-content/uploads/2015/04/Spider-Man.jpeg"
                    alt=""
                    className="img-poster"
                  />
                </div>
                // <ReactPlayer
                //   url={film.poster[0].url} // Lấy URL từ poster
                //   controls={true}
                //   width="100%"
                //   height="700px"
                // />
              )}
              <div className="overlay">
                <div className="introInfo">
                  <h1>{film.name}</h1>
                  <p>{film.description}</p>
                </div>
                <div className="intro-bottom">
                  <div className="bottom-play">
                    <Link to={`/detail/${film.id}`} className="bottom-detail">
                      <button>
                        <FaPlay className="icon" />
                        Phát
                      </button>
                    </Link>
                  </div>
                  <div className="bottom-otherInfo">
                    <button>
                      <FaCircleInfo className="icon" />
                      Thông tin khác
                    </button>
                  </div>
                  <div className="bottom-restriction">
                    <p>{film.restriction}+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Intro;
