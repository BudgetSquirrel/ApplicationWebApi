import React, { useContext, useRef } from 'react'
import './Login.scss'
import { useHistory } from 'react-router-dom';
import BasicForm from '../../components/generic/BasicForm/BasicForm';
import PasswordInput from '../../controls/PasswordInput/PasswordInput';
import BasicCheckbox from '../../components/generic/BasicCheckbox/BasicCheckbox';
import { ServiceContext } from '../../dependency-injection/service-context';
import RouteConstants from '../../RouteConstants';
import Layout from '../../Layout/Layout';

export default function Login() {
    const services = useContext(ServiceContext);
    const authService = services.authService;

    const history = useHistory();

    const usernameRef = useRef();
    const passwordRef = useRef();

    function onLoginClicked() {
        const password = passwordRef.current.value
        const username = usernameRef.current.value
        authService.login(username, password).then(function() {
            history.push(RouteConstants.BUDGET);
        });
    }

    const title = "Login";

    function LoginInput() {
        return (
            <>
                <input class="input" type="text" ref={usernameRef} placeholder="Username" />
                <PasswordInput valueRef={passwordRef} />                
                <BasicCheckbox title="Remember Me"/>            
            </>
        )
    }

    function LoginButton() {
        return (
            <>
                <button onClick={onLoginClicked} class="button button--wide">Login</button>
            </>
        )
    }

    return (
        <Layout>
            <div class="login">
                <BasicForm title={title}>
                    <LoginInput key="inputs" />
                    <LoginButton key="buttons" />
                </BasicForm>
                <a class="login__forgot-password" href="TBD">
                    I forgot my Password
                </a>
            </div>
        </Layout>
    )
}