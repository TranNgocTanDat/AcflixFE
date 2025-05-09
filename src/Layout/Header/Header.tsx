
import HeaderLast from "./HeaderLast.tsx";
import HeaderLogo from "./HeaderLogo.tsx";
import HeaderNavbar from "./HeaderNavbar.tsx";
import "./style.css";

const Header = () => {
  return (
    <>
      <div className="header">
        
        <HeaderLogo />

        <HeaderNavbar />

        <HeaderLast />
      </div>

    </>
  );
};

export default Header;
