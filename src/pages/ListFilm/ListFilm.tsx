
import { useEffect, useState } from "react";
import "./style.css";
import { Film } from "../../api/fake-api";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import FilmItem from "../../component/FilmItem";
import { findFilmByCate } from "../../services/categoryApi";
import { useParams } from "react-router-dom";
import { Page } from "../../model/Page";
import { filmFindNewReleased } from "../../services/filmApi";

const ListFilm = () => {
  const [limit] = useState(12);
  const [newReleased, setNewReleased] = useState<Film[]>([]);

  const [listFilms, setListFilms] = useState<Page<Film>>({
    totalItems: 0,
    limit: limit,
    isFirst: true,
    islLast: true,
    items: [] as Film[],
    offset: 0,
  } as Page<Film>);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams<{ categoryId: string }>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [sort, setSort] = useState<string>("newReleased");

  useEffect(() => {
    filmFindNewReleased(3)
      .then((response) => {
        setNewReleased(response.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        if (categoryId == undefined) return;
        const offset = (page - 1) * limit;
        const data = await findFilmByCate(categoryId, limit, offset, sort); // Gọi API với categoryId
        setListFilms(data);
        const pages = Math.ceil(data.totalItems / limit);

        const temp: number[] = [];
        for (let i = 1; i <= pages; i++) {
          temp.push(i);
        }
        setTotalPages(temp);
      } catch (error) {
        console.error("Error fetching category films:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình loading
      }
    };
    fetchFilm(); //Gọi hàm lấy dữ liệu.
  }, [categoryId, limit, page, sort]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  
  if (loading) return <div>Đang tải...</div>;

  return (
    <>
      <Header />

      <div className="list-film">
        <div className="list-title">Danh sách phim</div>
        <div className="sort-options">
          <label>Sắp xếp theo:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newReleased">Mới nhất</option>
            <option value="oldReleased">Cũ nhất</option>
            <option value="popularity">Độ phổ biến</option>
          </select>
        </div>
      </div>
      <div className="list">
        {listFilms.items.length > 0 ? (
          <div className="list-item">
            {listFilms.items.map((film) => (
              <div className="film-item" key={film.id}>
                <FilmItem data={film} />
              </div>
            ))}
          </div>
        ) : (
          <p>Không tìm thấy kết quả</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="button-set-page"
        >
          Trang trước
        </button>
        {totalPages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className="button-page"
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          // disabled={page === totalPages}
          className="button-set-page"
        >
          Trang sau
        </button>
      </div>

      <Footer />
    </>
  );
};

export default ListFilm;
