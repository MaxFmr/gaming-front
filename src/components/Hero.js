import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Hero = ({ page, search, dateFrom, dateTo, pageSize, ordering }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamingbymax.herokuapp.com/games?page=${page}&search=${search}&dates=${
            dateFrom ? dateFrom + "," + dateTo : ""
          }&page_size=${pageSize}&ordering=${ordering}`
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

  //Fonction de randomisation utilisée pour définir l'index de l'objet jeux dont l'image aparait dans le HERO, celle-ci change à chaque rafraichissment

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <>
      {isLoading === true ? (
        <div>loading...</div>
      ) : (
        data && (
          <div className='hero'>
            <h2>{data.count} games in data-base.</h2>
            <img
              className='hero-img'
              src={data.results[getRandomInt(0, 20)].background_image}
              alt=''
            />
          </div>
        )
      )}
    </>
  );
};

export default Hero;
