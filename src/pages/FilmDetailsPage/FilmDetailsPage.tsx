import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.scss';
import { Film } from "../../model/Film";
import {
    filmFindNewReleased,
    filmHaveNewEpisodes,
    findFilm,
    findRelatedFilm,
    getFilmComments,
    getFilmVote,
    postFilmComment
} from "../../services/filmApi";
import Genre from "../../constants/Genre.ts";
import { Vote } from "../../model/Vote.ts";
import { Comment } from "../../model/Comment.ts";
import SliderHome from "../../component/sliderShow/Slider.tsx";
import CategoryDetails from "../../model/CategoryDetails.ts";
import { findCategoryDetails } from "../../services/categoryApi.ts";

const FilmDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [film, setFilm] = useState<Film | null>(null);
    const [relatedFilms, setRelatedFilms] = useState<Film[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [vote, setVote] = useState<Vote | null>(null); // Chỉ lưu trữ số điểm vote
    const [newReleased, setNewReleased] = useState<Film[]>([]); // create state to store data new released
    const [newEpisodes, setNewEpisodes] = useState<Film[]>([]); // create state to store data new episodes
    const [categories, setCategories] = useState<CategoryDetails[]>([]);
    const [newComment, setNewComment] = useState<string>(""); // state để lưu bình luận mới

    useEffect(() => {
        filmFindNewReleased(6)
            .then((response) => {
                setNewReleased(response.items);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        // new episodes
        filmHaveNewEpisodes(6)
            .then((response) => {
                setNewEpisodes(response.items);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });


        const fetchFilmDetails = async () => {
            try {
                const filmData = await findFilm(id!);
                setFilm(filmData);

                const relatedFilmsData = await findRelatedFilm(id!);
                setRelatedFilms(relatedFilmsData);

                const voteData = await getFilmVote(id!); // Lấy số điểm vote
                setVote(voteData);

                const commentsData = await getFilmComments(id!, 10);
                setComments(commentsData.items);

                const newReleasedData = await filmFindNewReleased(10);
                setNewReleased(newReleasedData.items);

                const newEpisodesData = await filmHaveNewEpisodes();
                setNewEpisodes(newEpisodesData.items);

                const categoriesData = await findCategoryDetails(5);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching film details:", error);
            }
        };

        if (id) {
            fetchFilmDetails();
        }
    }, [id]);

    const handleAddComment = async () => {
        if (newComment.trim() === "") return; // Kiểm tra bình luận có rỗng không
        try {
            const addedComment = await postFilmComment(id!, newComment);
            setComments(prevComments => [...prevComments, addedComment]);
            setNewComment(""); // Xóa nội dung bình luận sau khi thêm
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (!film) {
        return <div>Film not found</div>;
    }

    return (
        <div className="film-details spad" style={{ backgroundImage: `url(${film.cover[0].url})` }}>
            <div className="container">
                <div className="film__details__content">
                    <div className="row">
                        <div className="col-lg-3">
                            <img className="film__poster" src={film.poster[0].url} alt={film.name} />
                        </div>
                        <div className="col-lg-6">
                            <div className="film__details__text">
                                <div className="film__details__title">
                                    <h3>{film.name}</h3>
                                    <span>{film.originalName}</span>
                                </div>
                                <div className="film__details__rating">
                                    <span>Đánh giá của bạn : {vote !== null ? `${vote.user} / 5` : ""}</span>
                                    <span>Số lượng đánh giá : {vote !== null ? `${vote.count}` : ""}</span>
                                    <span>Đánh giá : {vote !== null ? `${vote.average} / 5` : ""}</span>
                                </div>
                                <p>{film.description}</p>
                                <div className="film__details__widget">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <ul>
                                                <li><span>Loại:</span> {film.type}</li>
                                                <li><span>Đạo diễn:</span> {film.director}</li>
                                                <li><span>Ngày phát hành:</span> {film.releaseDate}</li>
                                                <li><span>Trạng thái:</span> {film.status}</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <ul>
                                                <li><span>Quốc gia:</span> {film.country}</li>
                                                <li><span>Ngôn ngữ:</span> {film.language}</li>
                                                <li><span>Thời lượng:</span> {film.duration} min</li>
                                                <li><span>Thể Loại:</span> {film.genres.map(g => Genre[g]).join(', ')}</li>
                                                <li><span>Số tập:</span> {film.episodes}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="film__details__btn">
                                    <a href={`/watch/${film.id}`} className="watch-btn">
                                        <span>XEM</span> <i className="fa fa-angle-right"></i>
                                    </a>
                                </div>
                                <div className="film__details__review" style={{ width: '100%', marginTop: '20px', padding: '0 20px' }}>
                                    <div className="section-title" style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color: '#ff7f50', paddingLeft: '10px' }}>
                                        <h5>Reviews</h5>
                                    </div>
                                    <div className="reviews-content" style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
                                        {comments.length > 0 ? (
                                            comments.map(comment => (
                                                <div key={comment.content} className="comment" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '15px', backgroundColor: '#2b2b2b', borderRadius: '10px', color: '#fff' }}>
                                                    <div className="comment-author" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff7f50', marginBottom: '5px' }}>{comment.user.name}</div>
                                                    <div className="comment-time" style={{ fontSize: '12px', color: '#bbb', marginBottom: '10px' }}>{comment.createdAt} </div>
                                                    <p style={{ fontSize: '14px', color: '#ddd' }}>{comment.content}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Chưa có đánh giá. Hãy là người đầu tiên!</p>
                                        )}
                                    </div>
                                </div>
                                <div className="film__details__form" style={{ width: '100%', marginTop: '20px', padding: '0 20px' }}>
                                    <div className="section-title" style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color: '#ff7f50', paddingLeft: '10px' }}>
                                        <h5>Bình Luận</h5>
                                    </div>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', resize: 'none', marginBottom: '10px', backgroundColor: '#2b2b2b', color: '#fff' }}
                                        placeholder="Your Comment"
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        style={{ backgroundColor: '#ff7f50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', textTransform: 'uppercase' }}
                                    >
                                        <i className="fa fa-location-arrow"></i> Đánh giá
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="film__details__sidebar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="section-title" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff7f50', marginBottom: '20px', textAlign: 'center' }}>
                                    <h5>Bạn có thể thích:</h5>
                                </div>
                                <div className="related-films">
                                    {relatedFilms.map(relatedFilm => (
                                        <Link
                                            key={relatedFilm.id}
                                            to={`/film/${relatedFilm.id}`}
                                            className="related-film-item"
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', textDecoration: 'none', color: '#ddd', textAlign: 'center', transition: 'color 0.3s ease' }}
                                        >
                                            <img src={relatedFilm.poster[0].url} alt={relatedFilm.name} />
                                            <h6 style={{ fontSize: '18px', margin: '0', color: '#fff', fontWeight: 'bold', transition: 'color 0.3s ease' }}>{relatedFilm.name}</h6>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div className="slide-title">Phim mới cập nhật</div>
                    <SliderHome dataFilm={newEpisodes} />
                </div>
            </div>
        </div>
    );
};

export default FilmDetailsPage;
