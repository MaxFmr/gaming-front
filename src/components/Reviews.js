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
        const response = await axios.get(
          `https://gamingbymax.herokuapp.com/review/${id}`
        );
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
          <div className='review'>
            <div className='user-review'>
              <div className='user'>
                <img className='avatar' src={review.userAvatar} alt='' />
                <div>{review.userName} </div>
              </div>
              <p>{review.review}</p>
              <div>{review.note} / 10 </div>
            </div>
            <div></div>
            <div className='likes'>
              <button
                onClick={() => {
                  like(review._id);
                  setLikes(!likes);
                }}
              >
                👍🏼 {review.likes.length}
              </button>
              <button
                onClick={() => {
                  dislike(review._id);
                  setDislikes(!dislikes);
                }}
              >
                👎🏼 {review.dislikes.length}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
