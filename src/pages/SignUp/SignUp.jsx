/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { images } from "../../constants/index";
// import { signup } from "../../services/http-client-service";
import { validateForm } from "../../services/inputs-validation";
import TextInput from "../../components/TextInput/TextInput";
import "./SignUp.css";

export default function SignUp() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (newValue, e) => {
    const { name } = e.target;
    setFormValues({ ...formValues, [name]: newValue });

    // Validating the form
    setIsValid(validateForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Uncomment the next line to see the form values in the console
    // console.log("Form values", formValues);

    signup(formValues)
      .then((_response) => {
        // Uncomment the next line to see the response from the server
        // console.log("Response", response);
        navigate("/login");
      })
      .catch((_error) => {
        // Uncomment the next line to see the error message in the console
        // console.log("Error", error);
        setError("Your email is already registered. Please try logging in.");
      });
  };

  return (
    <>
      <main className="app__main">
        <img className="app__img" src={images.checklist_2} alt="signup" />

        <section className="app__form-container">
          <h1 className="app__title signup-title">Create an account</h1>
          <form className="app__form" onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              value={formValues.name}
              name="name"
              onChange={handleChange}
              type="text"
              validate
            />
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
            <TextInput
              label="Confirm Password"
              value={formValues.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              validate
            />
            {error && <p className="form-group-error">{error}</p>}
            <div className="signup-form-group">
            <button className={`app__button ${!isValid && "button__disabled"}`} disabled={!isValid} type="submit">
                Sign Up
              </button>
            </div>
          </form>

          <aside className="login-register-anker">
            <Link to="/login">Already have an account? Login</Link>
          </aside>
        </section>
      </main>
    </>
  );
}
