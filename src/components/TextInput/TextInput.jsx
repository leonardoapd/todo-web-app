/* eslint-disable react/prop-types */
import { useState } from 'react';
import './TextInput.css';

export default function TextInput({ type = 'text', label }) {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const onChange = (event) => {
        setValue(event.target.value);

        // Validation usign regex and JSON schema
        const emailRegex = /\S+@\S+\.\S+/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const textRegex = /^[a-zA-Z]+$/;

        const validation = {
            email: emailRegex.test(event.target.value),
            password: passwordRegex.test(event.target.value),
            text: textRegex.test(event.target.value),
        };

        setIsValid(validation[type]);

        // if (type === 'email') {
        //     const emailRegex = /\S+@\S+\.\S+/;
        //     const isValid = emailRegex.test(event.target.value);
        //     console.log(isValid);
        // } else if (type === 'password') {
        //     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        //     const isValid = passwordRegex.test(event.target.value);
        //     console.log(isValid);
        // } else if (type === 'text') {
        //     const textRegex = /^[a-zA-Z]+$/;
        //     const isValid = textRegex.test(event.target.value);
        //     console.log(isValid);
        // } else {
        //     console.log('No validation');
        // }
    }

    return (
        <>
            <div className="form-group">
                <input
                    className="form-group-input"
                    type={type}
                    id={label}
                    value={value}
                    onChange={onChange}
                    // Using css var to change the color of the border
                    style={{ '--input-border-color': isValid ? '#06D6A0' : '#FF6B6B' }}
                />
                <label className={value && "filled"} htmlFor={label}>
                    {label}
                </label>
            </div>
        </>
    );
}