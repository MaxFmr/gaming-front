import { useNavigate } from "react-router";
import axios from "axios";

const FavoriteCard = ({ games, index, setDeleteClick, deleteClick }) => {
  const navigate = useNavigate();

  const deleteFavorite = async (id) => {
    try {
      await axios.post("http://localhost:3000/favorites/delete", {
        game_id: id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          deleteFavorite(games._id);
          setDeleteClick(!deleteClick);
        }}
        style={{
          backgroundColor: "#17171B",
          color: "grey",
          border: "none",
        }}
      >
        X
      </button>
      <div
        key={index}
        onClick={() => {
          navigate(`/game/${games.game.id}`);
        }}
        className='game-card'
      >
        <h2>{games.name}</h2>

        <img src={games.img} alt=''></img>
      </div>
    </div>
  );
};

export default FavoriteCard;
