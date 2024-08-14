import React from "react";
import "./style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDatas from "../../api/useData";
import { Film } from "../../api/fake-api";

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};

const SliderHome = () => {
  const { dataFilm, error } = useDatas();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slider">
      <div className="slider-title">
        <h2> Single Item Slider</h2>
      </div>
      <div className="slider-content">
        <Slider {...settings}>
          {error && <p>{error}</p>}
          {dataFilm.map((film: Film) => (
            <div className="box-film">
              <h1 className="film-name">{film.name}</h1>
              <p className="film-country">{film.country}</p>
              <img className="image" src={film.poster[0].url} alt="" width={300} height={200}/>
            </div>
          ))}
          {dataFilm.map((film: Film) => (
            <div className="box-film">
              <div className="film-text">
                <h1 className="film-name">{film.name}</h1>
                <p className="film-country">{film.country}</p>
                <img className="image" src={film.poster[0].url} alt="" />
              </div>
            </div>
          ))}
          {dataFilm.map((film: Film) => (
            <div className="box-film">
              <div className="film-text">
                <h1 className="film-name">{film.name}</h1>
                <p className="film-country">{film.country}</p>
                <img className="image" src={film.poster[0].url} alt="" />
              </div>
            </div>
          ))}
          {dataFilm.map((film: Film) => (
            <div className="box-film">
              <div className="film-text">
                <h1 className="film-name">{film.name}</h1>
                <p className="film-country">{film.country}</p>
                <img className="image" src={film.poster[0].url} alt="" />
              </div>
            </div>
          ))}
          {dataFilm.map((film: Film) => (
            <div className="box-film">
              <div className="film-text">
                <h1 className="film-name">{film.name}</h1>
                <p className="film-country">{film.country}</p>
                <img className="image" src={film.poster[0].url} alt="" />
              </div>
            </div>
          ))}
          {dataFilm.map((film: Film) => (
            <div className="box-film">
              <div className="film-text">
                <h1 className="film-name">{film.name}</h1>
                <p className="film-country">{film.country}</p>
                <img className="image" src={film.poster[0].url} alt="" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderHome;
