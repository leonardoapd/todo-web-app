import { Link } from "react-router-dom";
import { images } from "../../constants/index";
import TextInput from "../../components/TextInput/TextInput";
import "./SignUp.css";

export default function SignUp() {

    const signUp = (e) => {
        e.preventDefault();
        console.log('sign up');

        // Get the values from the form

        // Validate the values
        // Send the values to the backend
    }

    return (
        <>
            <main className="app__main">

                <img className="app__img" src={images.checklist_2} alt="signup" />

                <section className="app__form-container">
                    <h1 className="app__title signup-title">Create an account</h1>
                    <form className="app__form">
                        <TextInput label="Name"></TextInput>
                        <TextInput label="Email" type="email"></TextInput>
                        <TextInput label="Password" type="password"></TextInput>
                        <TextInput
                            label="Confirm Password"
                            type="password"
                        ></TextInput>
                        <div className="signup-form-group">
                            <button className="app__button" type="submit" onClick={signUp}>
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