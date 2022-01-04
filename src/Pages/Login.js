import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const Login = ({ setUser, token }) => {
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
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };

  return token === null ? (
    <form className='login-form' onSubmit={handleSubmit}>
      <h1>Se connecter</h1>

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
      <input className='login-button' type='submit' onClick={navigate} />
    </form>
  ) : (
    <Navigate to='/' />
  );
};

export default Login;
