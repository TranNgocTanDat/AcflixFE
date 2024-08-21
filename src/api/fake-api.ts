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
    const responseApi = await fetch("http://192.168.88.175:8080/api/browse/films/new-released");
    const data = await responseApi.json();
    return data.items as Film[];
}

export const FAKE_FILM_LIST:Film[] = await getDataApi() ;