import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ListFilm from "../../pages/ListFilm/ListFilm";
import Category from "../../model/Category";
import { findCategory } from "../../services/categoryApi";

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  const [listcate, setListCate] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const response = await findCategory(22, 0, 0); // Thay đổi các tham số limit, offset, sort nếu cần
        setListCate(response.items); // Giả sử dữ liệu trả về có cấu trúc { data: { items: [...] } }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCate();
  }, []);

  return (
    <>
      <div className="navlink">
        <ul
          className={
            MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
          }
          onClick={() => setMobileMenu(false)}
        >
          <li className="navlink__item">
            <Link to="/">Trang chủ</Link>
          </li>

          {listcate.slice(0, 2).map((c) => (
            <li className="navlink__item">
              <Link to={"/category/" + c.id}>{c.name}</Link>
            </li>
          ))}
          {/* <li className="navlink__item">

            <Link to="/user">Phim Lẻ</Link>
          </li>
          <li className="navlink__item">
            <Link to="/vendor">Phim bộ</Link>
          </li> */}
          <li className="navlink__item genre__item">
            Thể loại
            <div className="genre">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Link to="/genre">Hành động</Link>
                    </td>
                    <td>
                      <Link to="/genre">Kinh dị</Link>
                    </td>
                    <td>
                      <Link to="/genre">Hoạt hình</Link>
                    </td>
                    <td>
                      <Link to="/genre">Tình cảm</Link>
                    </td>
                    <td>
                      <Link to="/genre">Hài hước</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/genre">Chiến tranh</Link>
                    </td>
                    <td>
                      <Link to="/genre">Cổ trang</Link>
                    </td>
                    <td>
                      <Link to="/genre">Âm nhạc</Link>
                    </td>
                    <td>
                      <Link to="/genre">Khoa học</Link>
                    </td>
                    <td>
                      <Link to="/genre">Thể thao</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/genre">Tài liệu</Link>
                    </td>
                    <td>
                      <Link to="/genre">Gia đình</Link>
                    </td>
                    <td>
                      <Link to="/genre">Tội phạm</Link>
                    </td>
                    <td>
                      <Link to="/genre">Lịch sử</Link>
                    </td>
                    <td>
                      <Link to="/genre">Cấp 3</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/genre">Phiêu lưu</Link>
                    </td>
                    <td>
                      <Link to="/genre">Võ thuật</Link>
                    </td>
                    <td>
                      <Link to="/genre">Thần thoại</Link>
                    </td>
                    <td>
                      <Link to="/genre">Tâm lý</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li className="navlink__item">
            <Link to="/contact">Danh sách yêu thích</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
