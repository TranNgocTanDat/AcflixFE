import { useEffect, useState } from "react";

import "./style.scss";
import { Film } from "../../api/fake-api";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import FilmItem from "../../component/FilmItem";
import { findFilmByCate } from "../../services/categoryApi";
import { useParams } from "react-router-dom";
import { Page } from "../../model/Page";

const ListFilm = () => {
  // const [newReleased, setNewReleased] = useState<Film[]>([]);
  const [listFilms, setListFilms] = useState<Page<Film>>({
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams<{ categoryId: string }>();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<number[]>([]);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        if (categoryId == undefined) return;
        const offset = (page - 1) * limit;
        const data = await findFilmByCate(categoryId, limit, offset, ""); // Gọi API với categoryId
        setListFilms(data);
        const pages = Math.ceil(data.total / limit);
        setTotalPages(pages);
        // Tính toán danh sách các trang hiển thị
        const range = [];
        const start = Math.max(1, page - 2);
        const end = Math.min(pages, page + 2);
        for (let i = start; i <= end; i++) {
          range.push(i);
        }
        setPageRange(range);
      } catch (error) {
        console.error("Error fetching category films:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình loading
      }
    };
    fetchFilm(); //Gọi hàm lấy dữ liệu.
  }, [categoryId, page]);

  if (loading) return <div>Đang tải...</div>;

  //

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  return (
    <>
      <Header></Header>

      <div className="list-film">
        <div className="list-title">Danh sách phim</div>
        <div className="list">
          {listFilms.items.length > 0 ? (
            <div className="list-item">
              {listFilms.items.map((film) => (
                <div className="film-item">
                  <FilmItem data={film} key={film.id} />
                </div>
              ))}
            </div>
          ) : (
            <p>Không tìm thấy kết quả</p>
          )}
        </div>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Trang trước
        </button>
        {pageRange.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === page ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Trang sau
        </button>
      </div>

      <Footer></Footer>
    </>
  );
};

export default ListFilm;
