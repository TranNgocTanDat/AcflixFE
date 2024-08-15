import Actor from "./Actor.ts";

export interface Film {
    id: string;
    name: string;
    originalName: string;
    description: string;
    genres: string[];
    director: string;
    actors: Actor[];
    country: string;
    duration: number;
    releaseDate: string;
    releaseDatePrecision: string;
    type: string;
    restriction: number;
    poster: {
        url: string;
        width: number;
        height: number;
    }[];
    cover: {
        url: string;
        width: number;
        height: number;
    }[];
    status: string;
    language: string;
    episodes: number;
    lastEpisode: number;
}