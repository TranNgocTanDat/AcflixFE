import { Film } from "../api/fake-api";
import { Page } from "../model/Page";
import api from "./api";
import {Vote} from "../model/Vote.ts";
import {Comment} from "../model/Comment.ts";
import Episode from "../model/Episode.ts";
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
export const getEpisodes = async (id: string) => {
    return await api.get<Episode[]>(`/films/${id}/episodes`);
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
    return await api.post<Comment>(`/films/${id}/comments`, {content});
}

//get comments of film
export const getFilmComments = async(id: string, limit: number, offset = 0, sort ="") => {
    return await api.get<Page<Comment>>(`/films/${id}/comments`, {params: {limit, offset, sort}});
}

//get related film
export const findRelatedFilm = async (id: string) => {
    return await api.get<Film[]>(`/films/${id}/relation`);
}

//Vote film
//post vote of film
export const postFilmVote = async(id: string, vote: number) => {
    return await api.post(`/films/${id}/votes`, {vote});
}

//get vote of film
export const getFilmVote = async(id: string) => {
    return await api.get<Vote>(`/films/${id}/votes`);
}


//get search film
export const searchFilm = async (keyword: string, limit = 10, offset = 0, sort = "") => {
    return await api.get<Page<Film>>("/search/films", {params: {keyword, limit, offset, sort}});
}

//get stream link movie
export const getStreamLink = async (id: string) => {
    return await api.get<string>(`/films/movies/${id}/src`);
}

