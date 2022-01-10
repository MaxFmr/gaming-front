import { useNavigate } from "react-router";
import halo2 from "../img/halo2.png";
import gta from "../img/gta.png";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className='welcome-header'>
        <div
          onClick={() => {
            navigate("/home");
          }}
        >
          <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>GAMING</h1>
        </div>
        <div>
          <button onClick={() => navigate("/login")}>Login</button>

          <button onClick={() => navigate("/signup")}>Sign-Up</button>
        </div>
      </header>
      <div className='welcome-container'>
        <div className='welcome-characters'>
          <img className='halo' src={halo2} alt='spartan' />
          <img className='gta' src={gta} alt='gta' />
        </div>
        <div className='welcome-txt'>
          <h2>Welcome</h2>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
