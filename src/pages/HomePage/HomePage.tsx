
import { useEffect, useState } from "react";
import useDatas from "../../api/useData";
import Intro from "../../component/poster/intro";
import SliderHome from "../../component/sliderShow/Slider";
import "./style.css";
import CategoryDetails from "../../model/CategoryDetails";
import filmApi from "../../api/filmApi";



const HomePage = () => {
  const { dataFilm, error } = useDatas();
  // const [categries, setcategries] = useState<CategoryDetails[]>([])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await filmApi.getAllCategories();
  //       setcategries(response); // Gán response vào state data
  //     } catch (error) {
  //       setError('Error fetching data');
  //       console.error('Error fetching data:', error);
  //     }
  //   }});
  //   fetchData();
  // Gọi hook để lấy dữ liệu
  return (
    <div className="container">
      <Intro />
      {/* {categries.map((category) => (
          <div className="slide top10">
          <div className="slide-title">{category.name}</div>
          <SliderHome dataFilm={category.films} error={error} />
        </div>
      ))} */}
      <div className="slide top10">
        <div className="slide-title">Phim lẻ</div>
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

