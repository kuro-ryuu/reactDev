import {useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useAuthentication} from '../hooks/apiHooks';

const LoginForm = () => {
  const navigate = useNavigate();
  const {postLogin} = useAuthentication();
  const [error, setError] = useState('');
  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async (formData) => {
    setError('');
    try {
      const result = await postLogin(formData);
      if (!result.token) {
        throw new Error('The login response did not include an authentication token.');
      }
      localStorage.setItem('token', result.token);
      navigate('/');
    } catch (loginError) {
      console.error('Login failed:', loginError);
      setError(
        loginError instanceof Error ? loginError.message : 'Login failed.',
      );
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
};

export default LoginForm;
