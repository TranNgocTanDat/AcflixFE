import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.scss';

// Import dữ liệu giả hoặc từ API
import { FAKE_FILM_LIST, Film } from "../../api/fake-api";

const WatchPage: React.FC = () => {
    const { id, episode } = useParams<{ id: string, episode?: string }>(); // Nhận id phim và số tập từ URL
    const [film, setFilm] = useState<Film | null>(null);
    const [currentEpisode, setCurrentEpisode] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        const foundFilm = FAKE_FILM_LIST.find(f => f.id === id);
        if (foundFilm) {
            setFilm(foundFilm);
            if (episode) {
                setCurrentEpisode(parseInt(episode));
            }
        }
    }, [id, episode]);

    if (!film) {
        return <div>Film not found</div>;
    }

    const handleNext = () => {
        if (currentEpisode < film.episodes) {
            navigate(`/watch/${film.id}/${currentEpisode + 1}`);
        }
    };

    const handlePrev = () => {
        if (currentEpisode > 1) {
            navigate(`/watch/${film.id}/${currentEpisode - 1}`);
        }
    };

    return (
        <div className="watch-page">
            <div className="video-player">
                <video
                    controls
                    src={`path-to-your-video/${film.id}/episode-${currentEpisode}.mp4`}
                >
                    Your browser does not support the video tag.
                </video>
            </div>

            {film.type === 'series' && (
                <div className="episode-navigation">
                    <button onClick={handlePrev} disabled={currentEpisode === 1}>PREV</button>
                    <button onClick={() => navigate(`/watch/${film.id}/all`)}>ALL</button>
                    <button onClick={handleNext} disabled={currentEpisode === film.episodes}>NEXT</button>
                </div>
            )}

            {film.type === 'series' && (
                <div className="episode-selection">
                    <h3>Chọn tập phim</h3>
                    <div className="episodes-list">
                        {Array.from({ length: film.episodes }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => navigate(`/watch/${film.id}/${i + 1}`)}
                                className={currentEpisode === i + 1 ? 'active' : ''}
                            >
                                Tập {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Tên phim và mô tả */}
            <div className="film-info">
                <h2>{film.name}</h2>
                <p>{film.description}</p>
            </div>

            {/* Phần review lấy từ trang detail */}
            <div className="film-reviews">
                <h3>Reviews</h3>
                <div className="reviews-content">
                    {/* Thay thế phần này bằng nội dung review thực tế từ trang detail */}
                    <p>Review content from the film details page...</p>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
