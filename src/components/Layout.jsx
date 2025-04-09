import React from 'react';
import { Link, Outlet } from 'react-router';

export const Layout = () => {
    return (
        <>
            <header>
                <h1>George&apos;s app</h1>
            </header>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/upload">Upload</Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
};
