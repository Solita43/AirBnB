import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) <Redirect to='/' />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.loginUser({ credential, password })).catch(
            async (res) => {
                const error = await res.json();
                if (error && error.message) setErrors({ credential: error.message });
            }
        );
    };



    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <label htmlFor='credential'>Username or Email:</label>
                    <input
                        id='credential'
                        type='text'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    >
                    </input>
                </div>
                <div className='inputs'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    >
                    </input>
                </div>
                {errors.credential && <p>{errors.credential}</p>}
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default LoginFormPage;