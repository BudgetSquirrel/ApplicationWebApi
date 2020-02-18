import React, { useContext, useState, Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom'
import RouteConstants from '../../RouteConstants';
import { ServiceContext } from '../../dependency-injection/service-context';
import AuthService from '../../services/auth-service';
import { render } from '@testing-library/react';

export default class Header extends Component {
    static contextType = ServiceContext;

    render() {
        const authService = this.context.authService;
        const user = authService.currentUser;
        
        return (
            <header class="header">
                <div class="header__section header__section__left">
                    <h2>Budget Squirrel</h2>
                </div>
                <div class="header__section header__section__right">
                    <HeaderActions user={user} />
                </div>
            </header>
        );
    }
}

function HeaderActions({ user }) {
    if (user) {
        return (
            <span class="header__item">Hello {user.firstName}!</span>
        );
    } else {
        return (
            <>
                <Link className="header__button" to={RouteConstants.LOGIN}>
                    Login
                </Link>
                <Link className="header__button" to={RouteConstants.REGISTER}>
                    Sign Up
                </Link>
            </>
        );
    }
}