import React, {useState, useEffect, useReducer, useContext, useRef} from 'react';

import Card from '../UI/Card/Card';
import Input from "../UI/Input/Input";
import Button from '../UI/Button/Button';
import classes from './Login.module.css';
import AuthContext from "../../store/auth-context";

function emailReducer(state, action) {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.includes('@')};
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.includes('@')};
    }
    return {value: '', isValid: false};
}

function passwordReducer(state, action) {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.trim().length > 6};
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.trim().length > 6};
    }
    return {value: '', isValid: false};
}

function Login(props) {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    })

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        console.log('Effect Running');

        return () => {
            console.log('Effect Cleanup');
        }
    }, []);

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity');
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 550);

        return () => {
            console.log('Cleanup');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    function emailChangeHandler(event) {
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    }

    function passwordChangeHandler(event) {
        dispatchPassword({type: 'USER_INPUT', val: event.target.value})
    }

    function validateEmailHandler() {
        dispatchEmail({type: 'INPUT_BLUR'});
    }

    function validatePasswordHandler() {
        dispatchPassword({type: 'INPUT_BLUR'});
    }

    function submitHandler(event) {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default Login;
