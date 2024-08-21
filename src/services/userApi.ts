import api from "./api";

export const saveFilm = async (ids: string[]) => {
    return await api.put(`/me/films`,{ params: { ids } });
}