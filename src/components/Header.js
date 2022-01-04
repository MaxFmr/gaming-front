import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Header;
