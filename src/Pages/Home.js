import axios from "axios";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState();
  const [platformFilter, setPlatformFilter] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (platformFilter !== undefined) {
        try {
          const response = await axios.get(
            `http://localhost:3000/games/?platforms=${platformFilter}`
          );
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get("http://localhost:3000/platforms");
          console.log(response.data);
          setPlatforms(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const response = await axios.get("http://localhost:3000/platforms");
          console.log(response.data);
          setPlatforms(response.data);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get(`http://localhost:3000/games/`);
          console.log(response.data);
          setData(response.data);

          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [platformFilter]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <select
        onChange={(event) => setPlatformFilter(event.target.value)}
        name='pets'
        id='pet-select'
      >
        <option value=''>--Please choose a platform--</option>

        {platforms.results.map((platform, index) => {
          return (
            <option key={index} value={platform.id}>
              {platform.name}
            </option>
          );
        })}
      </select>

      <div className='container'>
        {data.results.map((games, index) => {
          return (
            <Link to={`/game/${games.id}`}>
              <GameCard games={games} id={games.slug} key={index} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
