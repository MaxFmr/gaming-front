import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

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
    <div>
      <form onSubmit={handleSubmit}>
        <p>review</p>
        <textarea
          onChange={(event) => {
            setReview(event.target.value);
          }}
          cols='30'
          rows='10'
        ></textarea>
        <input
          type='number'
          onChange={(event) => {
            setNote(event.target.value);
          }}
        />
        <button type='submit'>Envoyer</button>
      </form>
    </div>
  );
};

export default AddReview;
