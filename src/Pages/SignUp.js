import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [file, setFile] = useState({});

  const formData = new FormData();
  formData.append("avatar", file);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log("sub");
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("avatar", file);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:3000/signup",

        formData
      );
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className='signup-form'>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div>
          {" "}
          <input
            type='text'
            placeholder='Username'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Email'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            onChange={(event) => {
              setPassword(event.target.value);
              console.log(password);
            }}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Confirm your password'
            onChange={(event) => {
              setPassword2(event.target.value);
              console.log(password2);
            }}
          />
        </div>
        <div>
          <input
            type='file'
            placeholder='Confirm your password'
            onChange={(event) => {
              setFile(event.target.files[0]);
              console.log("file uploaded");
            }}
          />
        </div>

        <div>
          <input className='submit-button' type='submit' />
        </div>
      </form>
    </div>
  );
};

export default Signup;
