import { Link, Outlet } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';
import { useEffect } from 'react';

export const Layout = () => {
    const { user, handleAutoLogin } = useUserContext();
    useEffect(() => {
        handleAutoLogin();
    }, []);
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
                        {user ? (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/upload">Upload</Link>
                                </li>
                                <li>
                                    <Link to="/logout">Logout</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
};
