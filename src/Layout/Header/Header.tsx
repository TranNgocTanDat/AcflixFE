import { useEffect } from "react";
import HeaderLast from "./HeaderLast";
import HeaderLogo from "./HeaderLogo";
import HeaderNavbar from "./HeaderNavbar";
import "./style.css";

const Header = () => {
  // Fixed Header khi scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector<HTMLElement>(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="header">
      <HeaderLogo />
      <HeaderNavbar />
      <HeaderLast />
    </div>
  );
};

export default Header;
