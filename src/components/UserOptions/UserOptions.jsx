import "./UserOptions.css";
import { images } from "../../constants";

export default function UserOptions({ userPicture, userName, userEmail, handleLogout }) {
  return (
    <>
      <div className="user-options">
        <div className="user-profile">
          <div className="change-img">
            <img
              className="user-img"
              src={images.user}
              alt="user"
            />
            <button className="change-img__button">
              <i className="material-symbols-outlined">camera</i>
            </button>
          </div>
          <div className="user-info">
            <p className="user-name">{userName}</p>
            <p className="user-email">{userEmail}</p>
          </div>
        </div>
        <button className="logout__button" onClick={handleLogout}>
          <i className="material-symbols-outlined">logout</i>
          Logout
        </button>
      </div>
    </>
  );
}
