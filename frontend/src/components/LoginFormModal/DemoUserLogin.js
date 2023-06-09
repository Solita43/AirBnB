import React from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function DemoUserLoginButton({closeMenu}) {
    const dispatch = useDispatch();

    const loginDemo = () => {
        dispatch(sessionActions.loginUser({credential: 'Demo-lition', password: 'password'})).then(() => closeMenu());
    }

    return (
        <button onClick={loginDemo} id="demo-login">Demo User</button>
    );
}

export default DemoUserLoginButton;