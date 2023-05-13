import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css';
import DemoUserLoginButton from "./DemoUserLogin";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.loginUser({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h3 id='login_title'>Log In</h3>
      {errors.credential && (
        <p className="errors">{errors.credential}</p>
      )}
      <form onSubmit={handleSubmit} className='modal'>
        <label>
          Username or Email
          <input
            className="login_input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="login_input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button id='login-button' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <DemoUserLoginButton closeMenu={closeModal} />
    </>
  );
}

export default LoginFormModal;