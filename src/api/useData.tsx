import { useEffect, useState } from "react";
import filmApi from "./filmApi";
import { Film } from "./fake-api";

const useDatas = () => {
    const [dataFilm, setDataFilm] = useState<Film[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await filmApi.getAll();
          setDataFilm(response); // Gán response vào state data
        } catch (error) {
          setError('Error fetching data');
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    return { dataFilm, error };
  };
  
  export default useDatas;