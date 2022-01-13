import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigate, useNavigate } from "react-router";
import FavoriteCard from "../components/FavoriteCard";

const Favorites = ({ token, setUser }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteClick, setDeleteClick] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gamingbymax.herokuapp.com/favorites",

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
  }, [deleteClick]);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <Header token={token} setUser={setUser} />
      <div className='container'>
        {data.map((games, index) => {
          return (
            <FavoriteCard
              games={games}
              index={index}
              deleteClick={deleteClick}
              setDeleteClick={setDeleteClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
