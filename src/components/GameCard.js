import { useState } from "react";
import axios from "axios";

const GameCard = ({ id, games, isLoading }) => {
  const [over, setOver] = useState(false);
  const [movie, setMovie] = useState();

  const fetchTrailer = async (gameId) => {
    try {
      const response = await axios.get(
        `https://gamingbymax.herokuapp.com/games/${gameId}/movies`
      );
      setMovie(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div>
      <div
        onMouseEnter={() => {
          setOver(true);
          fetchTrailer(id);
        }}
        onMouseLeave={() => {
          setOver(false);
        }}
        className='game-card'
      >
        {over && movie && movie.length > 0 ? (
          <video controls height='100%' width='100%' autoPlay muted>
            <source src={movie[0].data["480"]} type='video/mp4'></source>
          </video>
        ) : (
          <div>
            <h2>{games.name}</h2>
            <img src={games.background_image} alt=''></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
