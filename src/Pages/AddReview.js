import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const AddReview = ({ token }) => {
  const navigate = useNavigate();
  const [review, setReview] = useState();
  const [note, setNote] = useState();

  // const userName = userData.account.username;
  // const userAvatar = userData.account.avatar.secure_url;

  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/review/create",
        {
          review: review,
          note,
          gameId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      response.data.message === "review created"
        ? navigate(`/game/${id}`)
        : alert(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header token={token} />
      <div className='add-review'>
        <form onSubmit={handleSubmit}>
          <h3>review</h3>
          <textarea
            onChange={(event) => {
              setReview(event.target.value);
            }}
            cols='30'
            rows='10'
            required
          ></textarea>
          <h3>Note / 10</h3>
          <input
            type='number'
            onChange={(event) => {
              setNote(event.target.value);
            }}
            max='10'
            min='0'
            required
          />
          <button type='submit'>add</button>
        </form>
      </div>
    </>
  );
};

export default AddReview;
