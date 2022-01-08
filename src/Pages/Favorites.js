import axios from "axios";
import { useState, useEffect } from "react";

const Favorites = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/favorites",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      {data.map((favorites, index) => {
        return (
          <div key={index}>
            <p>{favorites.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
