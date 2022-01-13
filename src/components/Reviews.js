import axios from "axios";
import { useState, useEffect } from "react";
import Review from "./Review";

const Reviews = ({ id, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamingbymax.herokuapp.com/review/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [likes, dislikes]);

  const like = async (_id) => {
    try {
      const response = await axios.post(
        `https://gamingbymax.herokuapp.com/review/like`,
        {
          _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const dislike = async (_id) => {
    try {
      const response = await axios.post(
        `https://gamingbymax.herokuapp.com/review/dislike`,
        {
          _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className='reviews'>
      <h2>Reviews</h2>
      {data.length === 0 && <p>No review for this game.</p>}
      {data.map((review, index) => {
        return (
          <Review
            review={review}
            index={index}
            likes={likes}
            setLikes={setLikes}
            dislikes={dislikes}
            setDislikes={setDislikes}
            like={like}
            dislike={dislike}
          />
        );
      })}
    </div>
  );
};

export default Reviews;
