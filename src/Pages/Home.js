import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/games");
        console.log(response.data);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPlaforms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/platforms");
        console.log(response.data);
        setPlatforms(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    fetchPlaforms();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Header />
      <select name="pets" id="pet-select">
        <option value="">--Please choose a platform--</option>

        {platforms.results.map((platform, index) => {
          return (
            <option key={index} value={platform.name}>
              {platform.name}
            </option>
          );
        })}
      </select>

      <div className="container">
        {data.results.map((games, index) => {
          return <GameCard games={games} id={games.slug} key={index} />;
        })}
      </div>
    </>
  );
};

export default Home;
