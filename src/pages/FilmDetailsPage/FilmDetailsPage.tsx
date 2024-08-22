import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';
import { FAKE_FILM_LIST, Film } from "../../api/fake-api";
import { Link } from 'react-router-dom';

const FilmDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [film, setFilm] = useState<Film | null>(null);
    const [relatedFilms, setRelatedFilms] = useState<Film[]>([]);

    useEffect(() => {
        const foundFilm = FAKE_FILM_LIST.find(film => film.id === id);
        if (foundFilm) {
            setFilm(foundFilm);
            const related = FAKE_FILM_LIST.filter(f =>
                f.id !== foundFilm.id &&
                f.genres.some(genre => foundFilm.genres.includes(genre))
            ).slice(0, 6);
            setRelatedFilms(related);
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
                                    <div className="rating">
                                        {[...Array(Math.round(film.restriction / 2))].map((_, index) => (
                                            <a href="#" key={index}><i className="fa fa-star"></i></a>
                                        ))}
                                    </div>
                                    <span>{film.restriction} / 10</span>
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
                                                <li><span>Genres:</span> {film.genres.join(', ')}</li>
                                                <li><span>Episodes:</span> {film.episodes}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="film__details__btn">
                                    <a href={`/watch/${film.id}`} className="watch-btn"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="film__details__sidebar">
                                <div className="section-title">
                                    <h5>You might like...</h5>
                                </div>
                                <div className="related-films">
                                    {relatedFilms.map(relatedFilm => (
                                        <Link key={relatedFilm.id} to={`/film/${relatedFilm.id}`} className="related-film-item">
                                            <img src={relatedFilm.poster[0].url} alt={relatedFilm.name} />
                                            <h6>{relatedFilm.name}</h6>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="film__details__review">
                                <div className="section-title">
                                    <h5>Reviews</h5>
                                </div>
                                <div className="reviews-content">
                                    {/* Thay thế phần này bằng nội dung review thực tế */}
                                    <p>Review content here...</p>
                                </div>
                            </div>
                            <div className="film__details__form">
                                <div className="section-title">
                                    <h5>Your Comment</h5>
                                </div>
                                <form action="#">
                                    <textarea placeholder="Your Comment"></textarea>
                                    <button type="submit"><i className="fa fa-location-arrow"></i> Review</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmDetailsPage;
