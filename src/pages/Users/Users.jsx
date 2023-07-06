import { useEffect, useState } from "react";
import { getUsers } from "../../services/http-client-service";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        // Uncomment the next line to see the error message in the console
        // console.log("Error", error);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
      <main className="app__main">
        <h1 className="app__title">Users</h1>
        <section className="app__users-container">
          <ul className="app__users-list">
            {users.map((user, index) => (
              <li key={index} className="app__user">
                <p className="app__user-name">{user.name}</p>
                <p className="app__user-email">{user.email}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
