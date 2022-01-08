import axios from "axios";
import { useState, useEffect } from "react";

const Reviews = ({ id, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/review/${id}`);
        console.log(response.data);
        setData(response.data);
        setLikes(response.data.likes);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [likes]);

  const like = async (_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/review/like`,
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
        `http://localhost:3000/review/dislike`,
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
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <h2>Reviews</h2>

      {data.map((review, index) => {
        return (
          <div>
            <h3>{review.userName}</h3>
            <h3>{review.note}</h3>
            <p>{review.review}</p>
            <button
              onClick={() => {
                like(review._id);
                setLikes(!likes);
              }}
            >
              like
            </button>
            <p>{review.likes.length}</p>

            <button
              onClick={() => {
                dislike(review._id);
                setDislikes(!dislikes);
              }}
            >
              dislike
            </button>
            <p>{review.dislikes.length}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
