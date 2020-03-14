import React from 'react'
import Header from '../components/Header/Header'
import './Layout.scss';

export default function Layout({ children }) {
    return (
        <main class="layout">
            <Header></Header>
            {children}
        </main>
    )
}
