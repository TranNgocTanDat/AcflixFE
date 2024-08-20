
import { Link } from "react-router-dom";
import Search from "../../component/search/Search.tsx";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const HeaderLast = () => {
    return (
        <div className="header__last">
            <Search />
        <div className="header__last--notifications">
        <Link to="/notification">
          <IoNotifications className="icon"/>
        </Link>
        </div>
        <div className="header__last--users">
        <Link to="/user">
            <FaUser className="icon"/>
          </Link>
        </div>
        </div>
    );
}

export default HeaderLast;