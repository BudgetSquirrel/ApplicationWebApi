import React from 'react';
import './Register.scss';
import PasswordInput from '../../controls/PasswordInput/PasswordInput';
import BasicForm from '../../components/generic/BasicForm/BasicForm';
import Layout from '../../Layout/Layout';

export default function Register() {
    const title = "Register your account";
    const description = "Registering your account allows you to track your budget accross multiple platforms.";

    function RegisterInputs() {
        return (
            <>
                <input class="input" type="text" placeholder="Name" />
                <input class="input" type="text" placeholder="Email" />
                <PasswordInput />
                <p class="input__explain">Password must be at least 12 characters or longer.</p>
            </>
        )
    }
    
    function RegisterButtons() {
        return (
            <>
                <button class="button button--wide">Register</button>
            </>
        )
    }

    const inputs = <RegisterInputs />
    const buttons = <RegisterButtons />

    return (
        <Layout>
            <div class="register">
                <BasicForm title={title} description={description}>
                    <RegisterInputs key="inputs" />
                    <RegisterButtons key="buttons" />
                </BasicForm>
            </div>
        </Layout>
    )
}
