import { FAKE_FILM_LIST } from "./fake-api";
import { Film } from "./fake-api";

const getAll = async ():Promise<Film[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(FAKE_FILM_LIST);
        }, 1000);
    });
};

export default {
    getAll,
};