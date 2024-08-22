import { FaPlay } from "react-icons/fa";
import { Film } from "../../model/Film.ts";
import "./style.css";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import FilmStatus from "../../constants/FilmStatus.ts";

interface FilmItemProps {
  data: Film;
}

const FimItem = (props: FilmItemProps) => {
  const { data } = props;
  return (
    <div key={data.id} className="box">
      <Link to = {`/film/${data.id}`}>
      <div className="box-poster">
        <img className="image" src={data.poster[0].url} alt={data.name} />
        <FaPlay className="icon-play" />
        <FaRegHeart className="icon-heart" />
        <p className="status">{FilmStatus[data.status]}</p>
      </div>
      <div className="box-info">
        <p className="name">{data.name}</p>
        <p className="date">{data.releaseDate}</p>
      </div>
      </Link>
    </div>
  );
};

export default FimItem;
