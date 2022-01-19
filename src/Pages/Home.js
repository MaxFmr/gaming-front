import axios from "axios";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
const Home = ({ token, setUser }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState();
  const [platformFilter, setPlatformFilter] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [pageSize, setPageSize] = useState();
  const [ordering, setOrdering] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (platformFilter !== undefined) {
        try {
          const response = await axios.get(
            `https://gamingbymax.herokuapp.com/games/?platforms=${platformFilter}`
          );
          setData(response.data);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get(
            "https://gamingbymax.herokuapp.com/platforms"
          );
          setPlatforms(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const response = await axios.get(
            "https://gamingbymax.herokuapp.com/platforms"
          );
          setPlatforms(response.data);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get(
            `https://gamingbymax.herokuapp.com/games?page=${page}&search=${search}&dates=${
              dateFrom ? dateFrom + "," + dateTo : ""
            }&page_size=${pageSize}&ordering=${ordering}`
          );
          setData(response.data);

          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [platformFilter, page, search, dateTo, pageSize, ordering]);

  const folowingPage = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const previousPage = () => {
    setPage(page - 1);
    setIsLoading(true);
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <>
      <Header token={token} setUser={setUser} />

      <div className='container'>
        <Search
          setSearch={setSearch}
          setPlatformFilter={setPlatformFilter}
          platforms={platforms}
          setOrdering={setOrdering}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
        {data.count === 0 && (
          <div>No game's matching with your research...</div>
        )}
        {data.results.map((games, index) => {
          return (
            <Link to={`/game/${games.id}`}>
              <GameCard games={games} id={games.slug} key={index} />
            </Link>
          );
        })}
      </div>
      {data.count > 0 && (
        <div className='paginate'>
          {data.count >= 20 && (
            <select
              onChange={(event) => setPageSize(event.target.value)}
              name='page-size'
              id='size-select'
            >
              <option value=''>Results per page : 20</option>
              <option value='40'>Results per page : 40</option>;
            </select>
          )}

          {page > 1 ? <button onClick={previousPage}>⬅</button> : <div></div>}
          {data.count >= 20 && <button onClick={folowingPage}>Next</button>}
        </div>
      )}
    </>
  );
};

export default Home;
