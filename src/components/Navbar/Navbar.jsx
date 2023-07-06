import { useNavigate, Link } from "react-router-dom";
import { images } from "../../constants";
import { logout } from "../../services/http-client-service";
import "./Navbar.css";

export default function Navbar({ userEmail }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Call the logout service to invalidate the token
    logout();
    // Go to login page
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          {/* <a className="navbar-logo"> */}
          <i className="material-symbols-outlined">list_alt_add</i>
          {/* </a> */}
        </Link>
        <div>
          <h1 className="navbar-title">To do List</h1>
        </div>
        {/* <div className="navbar-user">
                    <p className="navbar-user-email">{userEmail}</p>
                    <img className="navbar-user-img" src={images.user} alt="user" />
                </div> */}
        <div className="navbar-logout">
          <a href="" onClick={handleLogout}>
            <i className="material-symbols-outlined">exit_to_app</i>
          </a>
        </div>
      </nav>
    </>
  );
}
