import { Link, useNavigate } from "react-router-dom";
import Search from "../../component/search/Search.tsx";
import { IoNotifications } from "react-icons/io5";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  useAppDispatch,
  useAppSelector,
  useAuthAction,
  useAuthSelector,
} from "../../redux/store.ts";
import api from "../../services/api.ts";

const HeaderLast = () => {
  const { principle } = useAuthSelector();
  const dispatch = useAppDispatch();
  const { setPrinciple } = useAuthAction();
  const naviagte = useNavigate();
  const handleLogout = () => {
    dispatch(setPrinciple(null));
    api.setDefaultHeader("Authorization", undefined);
    naviagte("/login");
  };
  return (
    <div className="header__last">
      <Search />
      <div className="header__last--notifications">
        <Link to="/notification">
          <IoNotifications className="icon" />
        </Link>
      </div>
      {principle ? (
        <>
          <div className="header__last--users">
            <Link to="/user">
              <FaUser className="icon" />
            </Link>
            <div className="header__last--users">
              <button onClick={handleLogout}>
                <FaSignOutAlt className="icon" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="header__last--users">
          <Link to="/login">
            <FaSignInAlt className="icon" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderLast;
