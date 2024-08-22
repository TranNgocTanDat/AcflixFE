import { Film } from "../api/fake-api";
import { Page } from "../model/Page";
import api from "./api";

// get new released film
export const filmFindNewReleased = async (limit = 5, offset = 0) => {
    return await api.get<Page<Film>>("/browse/films/new-released", {
        params: {
            limit,
            offset,
        },
    });
}

//get film have new episodes
export const filmHaveNewEpisodes = async (limit = 6) => {
    return await api.get<Page<Film>>("/browse/films/new-episode", {params: {limit}});
}

//get film by id
export const findFilm = async(id: string) => {
    return await api.get<Film>(`/films/${id}`);
}

//get several film by id
export const getSeveralFilm = async(ids: string[]) => {
    return await api.get<Film[]>("/films", {params: {ids}});
}

// comments film

//post comment of film
export const postFilmComment = async(id: string, content: string) => {
    return await api.post<Comment>("/film/${id}/comments", {content});
}

//get comments of film
export const getFilmComments = async(id: string, limit: number, offset = 0, sort ="") => {
    return await api.get<Page<Comment>>(`/film/${id}/comments`, {params: {limit, offset, sort}});
}

//get related film
export const findRelatedFilm = async (id: string) => {
    return await api.get<Film[]>(`/film/${id}/related`);
}

//Vote film
//post vote of film
export const postFilmVote = async(id: string, vote: number) => {
    return await api.post("/film/${id}/vote", {vote});
}

//get vote of film
export const getFilmVote = async(id: string) => {
    return await api.get<number>(`/film/${id}/vote`);
}


//get search film
export const searchFilm = async (keyword: string, limit = 10, offset = 0, sort = "") => {
    return await api.get<Page<Film>>("/search/films", {params: {keyword, limit, offset, sort}});
}

//get stream link movie
export const getStreamLink = async (id: string) => {
    return await api.get<string>(`/films/movies/${id}/src`);
}

