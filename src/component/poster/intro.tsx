
import { Film } from "../../api/fake-api";
import useDatas from "../../api/useData";

import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Film } from "../../model/Film";
import { filmFindNewReleased } from "../../services/filmApi";

const getRandomItem = (arr: Film[]): Film => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const Intro = () => {
  const [newReleased, setNewReleased] = useState<Film[]>([]); // create state to store data new released

  useEffect(() => {
    filmFindNewReleased(10)
      .then((response) => {
        setNewReleased(response.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Chọn một mục ngẫu nhiên từ danh sách dữ liệu
  const randomFilm = newReleased.length > 0 ? getRandomItem(newReleased) : null;

  const getCoverSrc = (data: Film) => {
    return data.cover.reduce((acc, item) => {
      if (item.width > acc.width) {
        return item;
      }
      return acc;
    });
  };

  return (

      <>
        <div>
          {error && <p>{error}</p>}
          {randomFilm && (
              <div key={randomFilm.id} className="info">
                <div className="poster">
                  {randomFilm.cover.length > 0 && (
                      <div className="img-wrapper">
                        <img
                            src={getCoverSrc(randomFilm).url}
                            alt=""
                            className="img-poster"
                        />
                      </div>
                  )}
                  <div className="overlay">
                    <div className="introInfo">
                      <h1>{randomFilm.name}</h1>
                      <p>{randomFilm.description}</p>
                    </div>
                    <div className="intro-bottom">
                      <div className="bottom-play">
                        <Link to={`/film/${randomFilm.id}`}>
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
                        <p>{randomFilm.restriction}+</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
          )}
        </div>
      </>
  );
};

export default Intro;
