import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import SerieCaroussel from "../components/SerieCaroussel";
import Reviews from "../components/Reviews";

const Game = ({ token }) => {
  const [data, setData] = useState();
  const [serie, setSerie] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/game/${id}`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/games/${id}/game-series`
        );
        setSerie(response.data);
        setIsLoading(false);
        console.log(serie);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const addFavorite = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/favorites/create",
        {
          game: { data },
          img: data.background_image,
          name: data.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      response.data.message === "Favorite created"
        ? alert(response.data.message)
        : alert(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className='game-container'>
        <button
          onClick={() => {
            {
              token ? navigate(`/addreview/${id}`) : navigate("/login");
            }
          }}
        >
          Add a review
        </button>
        <button
          onClick={() => {
            {
              token ? addFavorite() : navigate("/login");
            }
          }}
        >
          Add to favorites
        </button>
        <div className='img-details'>
          <div className='game-image'>
            <div className='percent-appreciation'>
              {data.ratings.map((percent) => {
                const level = percent.percent;
                const adjectiv = percent.title;

                return (
                  <div>
                    {level} % {adjectiv.toUpperCase()}
                  </div>
                );
              })}
            </div>

            <img src={data.background_image} alt='' />
            <img src={data.background_image_additional} alt='' />
          </div>
          <div className='game-details'>
            <p>{data.description_raw}</p>
          </div>
        </div>
        <SerieCaroussel serie={serie} />
        <Reviews id={id} />
      </div>
    </>
  );
};

export default Game;
