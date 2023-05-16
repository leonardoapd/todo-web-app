/* eslint-disable react/prop-types */
import { useState } from 'react';
import './TextInput.css';

export default function TextInput({ type = 'text', label }) {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
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
                />
                <label className={value && "filled"} htmlFor={label}>
                    {label}
                </label>
            </div>
        </>
    );
}