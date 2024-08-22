import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.scss';
import { Film } from "../../model/Film";
import { findFilm, findRelatedFilm, getFilmComments, getFilmVote } from "../../services/filmApi";
import Genre from "../../constants/Genre.ts";
import {Vote} from "../../model/Vote.ts";
import {Comment} from "../../model/Comment.ts";

const FilmDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [film, setFilm] = useState<Film | null>(null);
    const [relatedFilms, setRelatedFilms] = useState<Film[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [vote, setVote] = useState<Vote | null>(null); // Chỉ lưu trữ số điểm vote

    useEffect(() => {
        if (id) {
            console.log(id)
            const fetchFilmDetails = async () => {
                try {
                    const filmData = await findFilm(id);
                    setFilm(filmData);
                    console.log(filmData)
                    const relatedFilmsData = await findRelatedFilm(id);
                    setRelatedFilms(relatedFilmsData);
                    const voteData = await getFilmVote(id); // Lấy số điểm vote
                    setVote(voteData);
                    const commentsData = await getFilmComments(id, 10);
                    setComments(commentsData.items);



                } catch (error) {
                    console.error("Error fetching film details:", error);
                }
            };

            fetchFilmDetails();
        }
    }, [id]);

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
                                    <span>Rating: {vote !== null ? `${vote.user} / 5` : ""}</span>
                                    <span>Total: {vote !== null ? `${vote.count} / 5` : ""}</span>
                                    <span>Average: {vote !== null ? `${vote.average} / 5` : ""}</span>

                                </div>
                                <p>{film.description}</p>
                                <div className="film__details__widget">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <ul>
                                                <li><span>Type:</span> {film.type}</li>
                                                <li><span>Director:</span> {film.director}</li>
                                                <li><span>Date released:</span> {film.releaseDate}</li>
                                                <li><span>Status:</span> {film.status}</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <ul>
                                                <li><span>Country:</span> {film.country}</li>
                                                <li><span>Language:</span> {film.language}</li>
                                                <li><span>Duration:</span> {film.duration} min</li>
                                                <li><span>Genres:</span> {film.genres.map(g => Genre[g]).join(', ')}</li>
                                                <li><span>Episodes:</span> {film.episodes}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="film__details__btn">
                                    <a href={`/watch/${film.id}`} className="watch-btn"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
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
                                                    <div className="comment-time" style={{ fontSize: '12px', color: '#bbb', marginBottom: '10px' }}>{comment.createAt} ago</div>
                                                    <p style={{ fontSize: '14px', color: '#ddd' }}>{comment.content}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No reviews yet. Be the first to comment!</p>
                                        )}
                                    </div>
                                </div>
                                <div className="film__details__form" style={{ width: '100%', marginTop: '20px', padding: '0 20px' }}>
                                    <div className="section-title" style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color: '#ff7f50', paddingLeft: '10px' }}>
                                        <h5>Your Comment</h5>
                                    </div>
                                    <form action="#">
                                        <textarea style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', resize: 'none', marginBottom: '10px', backgroundColor: '#2b2b2b', color: '#fff' }} placeholder="Your Comment"></textarea>
                                        <button type="submit" style={{ backgroundColor: '#ff7f50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', textTransform: 'uppercase' }}><i className="fa fa-location-arrow"></i> Review</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="film__details__sidebar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="section-title" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff7f50', marginBottom: '20px', textAlign: 'center' }}>
                                    <h5>You might like:</h5>
                                </div>
                                <div className="related-films">
                                    {relatedFilms.map(relatedFilm => (
                                        <Link
                                            key={relatedFilm.id}
                                            to={`/film/${relatedFilm.id}`}
                                            className="related-film-item"
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', textDecoration: 'none', color: '#ddd', textAlign: 'center', transition: 'color 0.3s ease' }}
                                        >
                                            <img src={relatedFilm.poster[0].url} alt={relatedFilm.name}  />
                                            <h6 style={{ fontSize: '18px', margin: '0', color: '#fff', fontWeight: 'bold', transition: 'color 0.3s ease' }}>{relatedFilm.name}</h6>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmDetailsPage;
