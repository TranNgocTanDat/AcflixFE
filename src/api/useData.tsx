import { useEffect, useState } from "react";
import filmApi from "./filmApi";
import { Film } from "./fake-api";

const useDatas = () => {
    const [dataFilm, setDataFilm] = useState<Film[]>([]);
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await filmApi.getAll();
          setDataFilm(response); // Gán response vào state data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    return { dataFilm};
  };
  
  export default useDatas;