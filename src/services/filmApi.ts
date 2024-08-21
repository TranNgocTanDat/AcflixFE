import { Film } from "../api/fake-api";
import { Page } from "../model/Page";
import api from "./api";

export const filmFindNewReleased = async (limit = 5, offset = 0) => {
    return await api.get<Page<Film>>("/browse/films/new-released", {
        params: {
            limit,
            offset,
        },
    });
}

export const filmHaveNewEpisodes = async () => {
    return await api.get<Page<Film>>("/browse/films/new-episodes");
}

