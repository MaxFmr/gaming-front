import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <div
        onClick={() => {
          navigate("/home");
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>GAMING</h1>
      </div>
      <div>
        {token ? (
          <>
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
          </>
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
