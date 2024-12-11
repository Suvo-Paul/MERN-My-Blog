import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';

function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/profile",
            { credentials: "include" }
        ).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch("http://localhost:5000/api/auth/logout", {
            credentials: "include",
            method: "POST"
        })
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">Blog</Link>
            <nav>
                {
                    username && (
                        <>
                            <span className="welcome">Hello, <span className='username'>{username}</span></span>
                            <Link to="/create">Create Post</Link>
                            <a onClick={logout}>Logout</a>
                        </>
                    )
                }

                {
                    !username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Header;