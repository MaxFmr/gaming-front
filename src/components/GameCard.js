import { useState } from "react";
import axios from "axios";

const GameCard = ({ id, games }) => {
  const [over, setOver] = useState(false);
  const [movie, setMovie] = useState();

  const fetchTrailer = async (gameId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/games/${gameId}/movies`
      );
      setMovie(response.data.results);
      console.log(movie);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => {
          setOver(true);
          fetchTrailer(id);
        }}
        onMouseLeave={() => {
          setOver(false);
        }}
        className="game-card"
      >
        {over && movie && movie.length > 0 ? (
          <video controls height="100%" width="100%" autoPlay muted>
            <source src={movie[0].data["480"]} type="video/mp4"></source>
          </video>
        ) : (
          <>
            <h2>{games.name}</h2>
            <img src={games.background_image} alt="" />
          </>
        )}
      </div>
    </>
  );
};

export default GameCard;
