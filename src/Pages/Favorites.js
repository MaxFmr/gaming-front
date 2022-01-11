import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigate, useNavigate } from "react-router";

const Favorites = ({ token, setUser }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
      <Header token={token} setUser={setUser} />
      <div className='container'>
        {data.map((games, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/game/${games.game.id}`);
              }}
              className='game-card'
            >
              <h2>{games.name}</h2>
              <img src={games.img} alt=''></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
