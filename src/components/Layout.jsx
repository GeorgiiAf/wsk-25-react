import { Link, Outlet } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';
import { useEffect } from 'react';
const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, []);
  return (
    <>
      <header>
        <h1 className="m-4 text-3xl font-bold">George&apos;s app</h1>
      </header>
      <div>
        <nav className="mb-4">
          <ul className="flex justify-end overflow-hidden bg-sky-900 p-2">
            <li>
              <Link
                className="block bg-sky-900 p-4 text-center text-sky-50 hover:bg-sky-700"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block bg-sky-900 p-4 text-center text-sky-50 hover:bg-sky-700"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block bg-sky-900 p-4 text-center text-sky-50 hover:bg-sky-700"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block bg-sky-900 p-4 text-center text-sky-50 hover:bg-sky-700"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block bg-sky-700 p-4 text-center text-sky-50 hover:bg-sky-700"
                  to="/login"
                >
                  Login
                </Link>
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


export default Layout;