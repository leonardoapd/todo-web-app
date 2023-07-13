import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { images } from "../../constants";
import { logout, getUser } from "../../services/http-client-service";
import { useMobileDetection } from "../../helpers/custom-hooks";
import { useEffect } from "react";
import UserOptions from "../UserOptions/UserOptions";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getUser()
      .then((response) => {
        setUserName(response.data.name);
        setUserEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    // Call the logout service to invalidate the token
    logout();
    // Go to login page
    navigate("/login");
  };

  const toggleUserOptions = (e) => {
    e.preventDefault();

    setShowUserOptions(!showUserOptions);
  };

  const isMobile = useMobileDetection();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          {/* <a className="navbar-logo"> */}
          <i className="material-symbols-outlined">task_alt</i>
          {/* </a> */}
          TODO LIST
        </Link>

        {/* <div className="navbar-options"> */}
        <a
          className="navbar-user"
          aria-label={"User options:" + userName}
          href="#"
          onClick={toggleUserOptions}
        >
          <img className="navbar-user-img" src={images.user} alt="user" />
          {/* <p className="navbar-user-name">Hi {userName}!</p> */}
        </a>
        {/* <button className="navbar-logout app__button" onClick={handleLogout}>
            {isMobile ? (
              <i className="material-symbols-outlined">logout</i>
            ) : (
              "Logout"
            )}
          </button> */}

        {/* </div> */}
        {showUserOptions && (
          <UserOptions
            userName={userName}
            userEmail={userEmail}
            handleLogout={handleLogout}
          />
        )}
      </nav>
    </>
  );
}
