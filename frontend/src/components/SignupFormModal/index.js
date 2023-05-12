import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});
        return dispatch(
            sessionActions.signUpUser({
                email,
                username,
                firstName,
                lastName,
                password,
            })
        )
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });


    };

    const disabled = !email || username.length < 4 || !firstName || !lastName || password.length < 6 || !confirmPassword || password !== confirmPassword

    return (
        <>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input
                        className="signup_input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className="errors">{errors.firstName}</p>}
                <label>
                    Last Name
                    <input
                        className="signup_input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className="errors">{errors.lastName}</p>}
                <label>
                    Email
                    <input
                        className="signup_input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className="errors">{errors.email}</p>}
                <label>
                    Username
                    <input
                        className="signup_input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p className="errors">{errors.username}</p>}

                <label>
                    Password
                    <input
                        className="signup_input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p className="errors">{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                        className="signup_input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            if (password !== e.target.value) {
                                setErrors(prev => {
                                    const err = { ...prev }
                                    err.confirmPassword = "Confirm Password field must be the same as the Password field"
                                    return err;
                                });
                            } else {
                                setErrors(prev => {
                                    const err = { ...prev }
                                    delete err.confirmPassword;
                                    return err;
                                })
                            }
                            setConfirmPassword(e.target.value)
                        }}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="errors">{errors.confirmPassword}</p>
                )}
                <button type="submit" id='sign_up_button' disabled={disabled}>Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;