import axios from "axios";
import { useState, useEffect } from "react";

const Reviews = ({ id }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const like = async (_id, event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/review/update`, {
        _id,
      });
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/review/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <h2>Reviews</h2>

      {data.map((review, index) => {
        return (
          <div>
            <h3>{review.username}</h3>
            <h3>{review.note}</h3>
            <p>{review.review}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
