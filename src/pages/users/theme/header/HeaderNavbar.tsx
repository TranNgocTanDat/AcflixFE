import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false)
  return (
    <>    
          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              <li className="navlink__item">
                <Link to='/'>Trang chủ</Link>
              </li>
              <li className="navlink__item">
                <Link to='/pages'>Phim T.hình</Link>
              </li>
              <li className="navlink__item">
                <Link to='/user'>Phim</Link>
              </li>
              <li className="navlink__item">
                <Link to='/vendor'>Mới & Phổ biến</Link>
              </li>
              <li className="navlink__item">
                <Link to='/track'>Danh sách của tôi</Link>
              </li > 
              <li className="navlink__item">
                <Link to='/contact'>contact</Link>
              </li>
            </ul>

            {/* <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button> */}
          </div>
    </>
  )
}

export default Navbar