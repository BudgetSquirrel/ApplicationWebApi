import React, { useState } from 'react';
import './PasswordInput.scss';

export default function PasswordInput({ id, classNames, name, valueRef, placeholder }) {
    let classes = `input input--pw ${classNames}`;
    if (!placeholder) placeholder = "Password";

    const [inputType, setInputType] = useState("password");

    function toggleInputType() {
        setInputType(previousType => {
            if (previousType === "password")
                return "text";
            else
                return "password";
        });
    }
    
    return (
        <div class="password-input input input--wrapper">
            <input id={id} class={classes} name={name} ref={valueRef} placeholder={placeholder} type={inputType} />
            <div class="password-input__eye" onClick={toggleInputType}>
                <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.11959e-07 7C6.92323e-07 6.08074 0.349189 5.17049 1.02763 4.32121C1.70607 3.47193 2.70047 2.70026 3.95406 2.05025C5.20765 1.40024 6.69588 0.884625 8.33378 0.532842C9.97167 0.181058 11.7272 -1.33519e-06 13.5 -1.18021e-06C15.2728 -1.02522e-06 17.0283 0.18106 18.6662 0.532843C20.3041 0.884626 21.7924 1.40024 23.0459 2.05025C24.2995 2.70026 25.2939 3.47194 25.9724 4.32122C26.6508 5.1705 27 6.08075 27 7L13.5 7L6.11959e-07 7Z" fill="#676767"/>
                    <ellipse cx="13.5" cy="9" rx="13.5" ry="7" fill="#C4C4C4"/>
                    <circle cx="13.5" cy="8.5" r="4.5" fill="#676767"/>
                </svg>
            </div>
        </div>
    )
}
