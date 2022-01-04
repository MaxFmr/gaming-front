import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [file, setFile] = useState({});
  const [passwordValidate, setPasswordValidate] = useState(false);

  const validate = () => {
    if (
      password.match(/[0-9]/g) &&
      password.match(/[a-z]/g) &&
      password.match(/[A-Z]/g) &&
      password.match(/[^a-zA-Z\d]/g) &&
      password.length >= 10
    ) {
      setPasswordValidate(true);
    }
  };

  const formData = new FormData();
  formData.append("avatar", file);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    passwordValidate && console.log("sub");
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
          <input
            type='text'
            placeholder='Username'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Email'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            onChange={(event) => {
              setPassword(event.target.value);
              validate();

              console.log(password);
            }}
            required
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
            required
          />
          {password !== password2 && (
            <div>
              <p style={{ color: "red" }}>The two passwords are differents</p>
            </div>
          )}
        </div>
        <div>
          <span>Your password must contain at least :</span>
          <p>one uppercase letter</p>
          {password.match(/[A-Z]/g) && (
            <span style={{ color: "green" }}>ok</span>
          )}
          <p>one lowercase letter</p>
          {password.match(/[a-z]/g) && (
            <span style={{ color: "green" }}>ok</span>
          )}
          <p>one number</p>
          {password.match(/[0-9]/g) && (
            <span style={{ color: "green" }}>ok</span>
          )}
          <p>one special character</p>
          {password.match(/[^a-zA-Z\d]/g) && (
            <span style={{ color: "green" }}>ok</span>
          )}
          <p>10 characters</p>
          {password.length >= 10 && <span style={{ color: "green" }}>ok</span>}
        </div>
        <div>
          <input
            type='file'
            placeholder='choose an avatar'
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
