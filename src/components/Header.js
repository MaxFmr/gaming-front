import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/consult",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='header'>
      <div
        onClick={() => {
          navigate("/home");
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>GAMING</h1>
        <p>db</p>
      </div>
      <div>
        {token ? (
          <div className='header-user'>
            <div>{data && data[0].username} 🟢 </div>
            <img
              className='avatar'
              src={data && data[0].avatar.secure_url}
              alt=''
            />
            <button
              onClick={() => {
                setUser();
                navigate("/");
              }}
            >
              Logout
            </button>
            <button onClick={() => navigate("/favorites")}>
              My Collection
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/login")}>Login</button>

            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
