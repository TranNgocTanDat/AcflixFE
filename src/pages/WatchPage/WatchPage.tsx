import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.scss';

import { findFilm, getEpisodes, getStreamLink, getFilmComments, postFilmComment } from '../../services/filmApi';
import VideoPlayer from './VideoPlayer';
import { Film } from '../../model/Film';
import Episode from "../../model/Episode.ts";
import { Comment } from "../../model/Comment.ts"; // Import Comment model

const WatchPage: React.FC = () => {
    const { id, episode } = useParams<{ id: string, episode?: string }>();
    const [film, setFilm] = useState<Film | null>(null);
    const [currentEpisode, setCurrentEpisode] = useState<number>(1);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [url, setUrl] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]); // State lưu trữ các bình luận
    const [newComment, setNewComment] = useState<string>(""); // State lưu trữ bình luận mới
    const navigate = useNavigate();

    useEffect(() => {
        const doWork = async () => {
            if (!id) {
                navigate('/notfound');
                return;
            }
            const foundFilm = await findFilm(id);
            if (foundFilm) {
                setFilm(foundFilm);
                if (foundFilm.type === 'series') {
                    setCurrentEpisode(0);
                    const temp = await getEpisodes(foundFilm.id);
                    setEpisodes(temp);
                } else {
                    const url = await getStreamLink(id);
                    setUrl(url);
                }

                // Lấy bình luận cho phim hiện tại
                const commentsData = await getFilmComments(id, 5); // Lấy 10 bình luận gần nhất
                setComments(commentsData.items);
            }
        };
        doWork();
    }, [id, episode, navigate]);

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
                <VideoPlayer src={url} />
            </div>

            {film.type === 'series' && (
                <div className="episode-navigation">
                    <button className="prev-button" onClick={handlePrev} disabled={currentEpisode === 1}>Tập trước</button>
                    <button className="next-button" onClick={handleNext} disabled={currentEpisode === film.episodes}>Tập sau
                    </button>
                </div>
            )}

            {film.type === 'series' && (
                <div className="episode-selection">
                    <h3>Chọn tập phim</h3>
                    <div className="episodes-list">
                        {episodes.map(e => (
                            <button
                                key={e.id}
                                onClick={() => navigate(`/watch/${film?.id}/${e.index}`)}
                                className={currentEpisode === e.index ? 'active' : ''}
                            >
                                Tập {e.label}
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

            {/* Phần review được load từ API */}
            <div className="film-reviews">
                <h3>Reviews</h3>
                <div className="reviews-content" style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.content} className="comment" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '20px',
                                padding: '15px',
                                backgroundColor: '#2b2b2b',
                                borderRadius: '10px',
                                color: '#fff'
                            }}>
                                <div className="comment-author" style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#ff7f50',
                                    marginBottom: '5px'
                                }}>{comment.user.name}</div>
                                <div className="comment-time" style={{
                                    fontSize: '12px',
                                    color: '#bbb',
                                    marginBottom: '10px'
                                }}>{comment.createdAt} </div>
                                <p style={{ fontSize: '14px', color: '#ddd' }}>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có đánh giá. Hãy là người đầu tiên!</p>
                    )}
                </div>
            </div>

            {/* Form bình luận */}
            <div className="film__details__form" style={{ width: '100%', marginTop: '20px', padding: '0 20px' }}>
                <div className="section-title" style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color: '#ff7f50', paddingLeft: '10px' }}>
                    <h5>Bình Luận</h5>
                </div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', resize: 'none', marginBottom: '10px', backgroundColor: '#2b2b2b', color: '#fff' }}
                    placeholder="Nội dung bình luận"
                />
                <button
                    onClick={handleAddComment}
                    style={{ backgroundColor: '#ff7f50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                    <i className="fa fa-location-arrow"></i> Đánh giá
                </button>
            </div>
        </div>
    );
};

export default WatchPage;
