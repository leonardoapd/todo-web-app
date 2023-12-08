/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from "react";
import { validateInput } from "../../services/inputs-validation";
import "./TextInput.css";

const TextInput = forwardRef(
  ({ label, type, name, onChange, validate = false }, ref) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    // Creating a resetInput function to clear the input field from the parent component using the ref prop
    useImperativeHandle(ref, () => ({
      resetInput: () => {
        setValue("");
      },
    }));

    const handleChange = (e) => {
      // Destructuring the event object to get the name and value of the input
      const { name, value } = e.target;

      // Updating the state with the new value and converting the email to lowercase if the input name is email
      name === "email" ? setValue(value.toLowerCase()) : setValue(value);

      if (validate) {
        // Validating the input value and setting the error message
        const error = validateInput(name, value);
        setError(error);
      }

      // Calling the onChange function if it exists and passing the value and event object
      if (typeof onChange === "function") {
        onChange(value, e);
      }
    };

    return (
      <>
        <div className="form-group">
          <input
            title={label.replace(/\s+/g, "-").toLowerCase()}
            className="form-group-input"
            name={name}
            type={type}
            id={label.replace(/\s+/g, "-").toLowerCase()}
            value={value}
            onChange={handleChange}
            // Using css var to change the color of the border
            style={{ "--input-border-color": error ? "#FF6B6B" : "#06D6A0" }}
            autoComplete="on"
          />
          <label className={value && "filled"} htmlFor={label.replace(/\s+/g, "-").toLowerCase()}>
            {label}
          </label>
          {error && <p className="form-group-error">{error}</p>}
        </div>
      </>
    );
  }
);

export default TextInput;
