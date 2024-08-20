
import useDatas from "../../api/useData";
import Intro from "../../component/poster/intro";
import SliderHome from "../../component/sliderShow/Slider";
import "./style.css";



const HomePage = () => {
  const { dataFilm, error } = useDatas(); // Gọi hook để lấy dữ liệu
  return (
    <div className="container">
      <Intro />
      <div className="slide">
        <div className="slide-title">Danh sách top 10</div>
        <SliderHome dataFilm={dataFilm} error={error} />
      </div>
      <div className="slide">
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
      </div>
    </div>
  ); 
}

export default HomePage;

