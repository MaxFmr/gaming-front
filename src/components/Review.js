import { useState } from "react";

const Review = ({ review, index, like, dislike }) => {
  const [likes, setLikes] = useState(initialState);
  return (
    <div key={index} className='review'>
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
            setLikes(likes + 1);
          }}
        >
          👍🏼 {review.likes.length}
        </button>
        <button
          onClick={() => {
            dislike(review._id);
            setDislikes(dislikes + 1);
          }}
        >
          👎🏼 {review.dislikes.length}
        </button>
      </div>
    </div>
  );
};

export default Review;
