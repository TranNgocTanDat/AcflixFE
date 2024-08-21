import "./style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Film } from "../../api/fake-api";
import React from "react";
import FilmItem from "../FilmItem";

export interface SliderProps {
  dataFilm: Film[];

}

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SliderHome: React.FC<SliderProps> = ({ dataFilm }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slider">
      <div className="slider-content">
        <Slider {...settings}>
          {dataFilm.map((film) => (
            <FilmItem data={film} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderHome;
