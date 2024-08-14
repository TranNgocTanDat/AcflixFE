export interface Film {
    id: string;
  name: string;
  originalName: string;
  description: string;
  genres: string[];
  director: string;
  actors: {
    id: string;
    name: string;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  }[];
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

const getDataApi = async (): Promise<Film[]> => {
    const responseApi = await fetch("http://127.0.0.1:3658/m1/619294-586489-default/films");
    const data = await responseApi.json();
    return data;
}

export const FAKE_FILM_LIST:Film[] = await getDataApi() ;