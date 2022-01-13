import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import SerieCaroussel from "../components/SerieCaroussel";
import Reviews from "../components/Reviews";
import Header from "../components/Header";

const Game = ({ token, setUser }) => {
  const [data, setData] = useState();
  const [serie, setSerie] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamingbymax.herokuapp.com/game/${id}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `https://gamingbymax.herokuapp.com/games/${id}/game-series`
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
        "https://gamingbymax.herokuapp.com/favorites/create",
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
      <Header token={token} setUser={setUser} />
      <div className='game-container'>
        <div>
          {" "}
          <button
            className='addbtn'
            onClick={() => {
              {
                token ? navigate(`/addreview/${id}`) : navigate("/login");
              }
            }}
          >
            Add a review
          </button>
          <button
            className='addbtn'
            onClick={() => {
              {
                token ? addFavorite() : navigate("/login");
              }
            }}
          >
            Add to favorites
          </button>
        </div>

        <div className='img-details'>
          <div className='game-image'>
            <div className='percent-appreciation'>
              <h3>RATINGS : </h3>

              {data.ratings.map((percent) => {
                const level = percent.percent;
                const adjectiv = percent.title;

                return (
                  <div className='ratings'>
                    {level} % {adjectiv.toUpperCase()}
                    {level >= 25 && <span> ✅</span>}
                  </div>
                );
              })}
            </div>

            <img src={data.background_image} alt='' />
            <img src={data.background_image_additional} alt='' />
          </div>
          <div className='game-details'>
            <h3>{data.name}</h3>

            <h3>Platforms</h3>
            {data.platforms.map((platform) => {
              return <p>{platform.platform.name}</p>;
            })}
            <h3>Description</h3>
            <p>{data.description_raw}</p>
            <p>Metacritic score : {data.metacritic}</p>
            <a href={data.metacritic_url}>View on metacritic</a>
            <a href={data.website}> Official website</a>
          </div>
        </div>
        <SerieCaroussel serie={serie} />
        <Reviews id={id} token={token} />
      </div>
    </>
  );
};

export default Game;
