import Intro from "../../../../component/intro/intro";
import HeaderLast from "./HeaderLast";
import HeaderLogo from "./HeaderLogo";
import HeaderNavbar from "./HeaderNavbar";
import "./style.css";

const Header = () => {
  return (
    <>
      <div className="header">
        
        <HeaderLogo />

        <HeaderNavbar />

        <HeaderLast />
      </div>
      <Intro />
    </>
  );
};

export default Header;
