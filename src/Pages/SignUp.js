import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [file, setFile] = useState({});
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [error, setError] = useState();
  const [fileUrl, setFileUrl] = useState();

  const validate = () => {
    if (
      password.match(/[0-9]/g) &&
      password.match(/[a-z]/g) &&
      password.match(/[A-Z]/g) &&
      password.match(/[^a-zA-Z\d]/g) &&
      password.length >= 8
    ) {
      setPasswordValidate(true);
    }
  };

  const formData = new FormData();
  formData.append("avatar", file);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordValidate === true) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("avatar", file);
        formData.append("password", password);

        const response = await axios.post(
          "https://gamingbymax.herokuapp.com/signup",

          formData
        );
        console.log(response.data);
        setError(response.data.errorMessage);

        if (response.data.token) {
          setUser(response.data.token);
          navigate("/");
        }
      } catch (error) {
        alert(error.message);
        console.log(error.message);
      }
    } else {
      alert("Your password might be stronger.");
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className='signup-form'>
          <div className='explanation'>
            <h3>How to ?</h3>
            <p>
              Just subscribe to make your own collection and adding, like or
              dislike some reviews.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <h3>Sign up</h3>

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
                }}
                required
              />
              {password !== password2 && (
                <div>
                  <p style={{ color: "red" }}>
                    The two passwords are differents
                  </p>
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
              <p>8 characters</p>
              {password.length >= 8 && (
                <span style={{ color: "green" }}>ok</span>
              )}
              {error ? (
                <div style={{ color: "red" }}>{error}</div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <h3>Your avatar</h3>
              <input
                className='avatar-choose'
                style={{ background: "none", cursor: "pointer" }}
                type='file'
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  const file = URL.createObjectURL(event.target.files[0]);
                  setFileUrl(file);
                  console.log("file uploaded");
                }}
              />
              {fileUrl && <img className='avatar' src={fileUrl} alt='' />}
            </div>

            <div>
              <button className='signup-button' type='submit'>
                signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
