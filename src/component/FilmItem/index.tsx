import { FaPlay } from "react-icons/fa";
import { Film } from "../../model/Film.ts";
import "./style.css";

interface FilmItemProps {
  data: Film;
}

const FimItem = (props: FilmItemProps) => {
  const { data } = props;
  return (
    <div key={data.id} className="box">
      <div className="box-poster">
        <img className="image" src={data.poster[0].url} alt={data.name} />
        <p className="name">{data.name}</p>
      </div>
      <div className="box-film">
        <FaPlay className="icon-play" />
      </div>
    </div>
  );
};

export default FimItem;
