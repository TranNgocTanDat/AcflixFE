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
    const responseApi = await fetch("https://4a6e-2402-800-6310-c187-d1fd-564c-376d-d3aa.ngrok-free.app/api/browse/films/new-released");
    const data = await responseApi.json();
    return data.items as Film[];
}

export const FAKE_FILM_LIST:Film[] = await getDataApi() ;