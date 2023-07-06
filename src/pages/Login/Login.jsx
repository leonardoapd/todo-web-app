import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateForm } from "../../services/inputs-validation";
import { login } from "../../services/http-client-service";
import { images } from "../../constants/index";
import { UserCredentials } from "../../models/user-credentials";
import TextInput from "../../components/TextInput/TextInput";
import "./Login.css";

export default function Login() {
  const [formValues, setFormValues] = useState(new UserCredentials());
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Error messages depending on the error code
  const errorMessages = {
    401: "Your email or password is incorrect. Please try again.",
    403: "Your email is not verified.",
    404: "Your email is not registered. Please sign up.",
    500: "There was an error. Please try again later.",
  };

  const handleChange = (newValue, e) => {
    const { name } = e.target;
    setFormValues({ ...formValues, [name]: newValue });

    // Validating the form
    setIsValid(validateForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Form values", formValues);

    login(formValues)
      .then(() => {
        // Go to users page
        navigate("/todos");
      })
      .catch(() => {
        // Uncomment the next line to see the error message in the console
        // console.log("Error", error);

        // Getting the error message from the server
        const errorMessage = error.response.data.code;

        console.log("Error message", errorMessage);

        // Setting the error message to display
        setError(errorMessages[errorMessage] || errorMessages[500]);
      });
  };

  return (
    <>
      <main className="app__main login-main">
        <img className="app__img" src={images.pana} alt="login" />
        <section className="app__form-container">
          <h1 className="app__title">Welcome back!</h1>
          <form className="app__form" onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              value={formValues.email}
              name="email"
              onChange={handleChange}
              type="email"
              validate
            />
            <TextInput
              label="Password"
              value={formValues.password}
              name="password"
              onChange={handleChange}
              type="password"
              validate
            />
            {error && <p className="form-group-error">{error}</p>}
            <div className="login-form-group">
              <button className="app__button" type="submit" disabled={!isValid}>
                Login
              </button>
            </div>
          </form>
          <aside className="login-register-anker">
            <Link to="/register">Don&rsquo;t have an account? Sign Up</Link>
          </aside>
        </section>
      </main>
    </>
  );
}
