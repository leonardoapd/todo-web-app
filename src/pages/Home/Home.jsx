import { images } from "../../constants/index";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <main className="app__main home">
        <header className="home-container">
          <h1 className="app__title home-title">ToDo List App</h1>
        </header>
        <section className="home-container">
          <figure>
            <img className="home-img" src={images.checklist} alt="home" />
          </figure>
          {/* <section className="home-buttons-container">
            <button className="home-button app__button" onClick={goToLogin}>
              Login
            </button>
            <button className="home-button app__button" onClick={goToRegister}>
              Sign Up
            </button>
          </section> */}
        </section>
      </main>
    </>
  );
}
