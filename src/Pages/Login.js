import axios from "axios";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";

const Login = ({ setUser, token, setUserData }) => {
  const navigate = useNavigate("/");

  //   const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        console.log(response);
        setUser(response.data.token);
        setUserData(response.data);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        setErrorMessage("Wrong email or password.");
      }
    }
  };

  return token === null ? (
    <>
      <Header />
      <form className='login-form' onSubmit={handleSubmit}>
        <h3>Login</h3>

        <input
          type='text'
          placeholder='Email'
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Mot de passe'
          onChange={(event) => {
            setPassword(event.target.value);
            console.log(password);
          }}
        />
        <span style={{ color: "red" }}>{errorMessage}</span>
        <button className='login-button' type='submit' onClick={navigate}>
          Login
        </button>
      </form>
    </>
  ) : (
    <Navigate to='/home' />
  );
};

export default Login;
