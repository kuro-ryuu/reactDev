import {createContext, useCallback, useRef, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const initialPath = useRef(location.pathname);

  // login, logout and autologin functions are here instead of components
  const handleLogin = useCallback(
    async (credentials) => {
      try {
        const loginResult = await postLogin(credentials);
        const token = loginResult?.token;
        if (!token) {
          throw new Error('Login did not return a valid token.');
        }

        localStorage.setItem('token', token);
        const userData = await getUserByToken(token);
        setUser(userData);
        navigate('/', {replace: true});
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [getUserByToken, navigate, postLogin],
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login', {replace: true});
  }, [navigate]);

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
        navigate(initialPath.current);
      }
    } catch (error) {
      console.error('Auto login failed:', error);
    }
  }, [getUserByToken, navigate]);

  return (
    <UserContext.Provider
      value={{user, setUser, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
