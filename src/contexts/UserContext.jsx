// UserContext.jsx
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useNavigate, useLocation } from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getUserByToken(token);
          if (userData) {
            setUser(userData.user);
          }
        }
      } catch (error) {
        console.error('Auto-login failed:', error);
        localStorage.removeItem('token');
      }
    };

    checkToken();
  }, []);

  const handleLogin = async (credentials) => {
    const loginResult = await postLogin(credentials);
    localStorage.setItem('token', loginResult.token);
    setUser(loginResult.user);
    navigate('/');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await getUserByToken(token);
        setUser(userResponse.user);
        console.log('location', location);
        navigate(location.pathname);
      }
    } catch (e) {
      handleLogout();
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogin, handleLogout, handleAutoLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };