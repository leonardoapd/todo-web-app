/* eslint-disable react/prop-types */
import { useState } from 'react';
import { validateInput } from '../../services/inputs-validation';
import './TextInput.css';

export default function TextInput({ label, type, name, onChange }) {

    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        // Destructuring the event object to get the name and value of the input
        const { name, value } = e.target;
        // Updating the state with the new value
        setValue(value);
        // Validating the input value and setting the error message
        const error = validateInput(name, value);
        setError(error);

        // Calling the onChange function if it exists and passing the value and event object
        if (typeof onChange === 'function') {
            onChange(value, e);
        }
    }

    return (
        <>
            <div className="form-group">
                <input
                    className="form-group-input"
                    name={name}
                    type={type}
                    id={label}
                    value={value}
                    onChange={handleChange}
                    // Using css var to change the color of the border
                    style={{ '--input-border-color': error ? '#FF6B6B' : '#06D6A0' }}
                />
                <label className={value && "filled"} htmlFor={label}>
                    {label}
                </label>
                {error && <p className="form-group-error">{error}</p>}
            </div>
        </>
    );
}