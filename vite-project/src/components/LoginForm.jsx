import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const [error, setError] = useState('');
  const initValues = {
    username: '',
    password: '',
  };

  const {handleLogin} = useUserContext();

  const doLogin = async (formData) => {
    setError('');
    try {
      await handleLogin(formData);
    } catch (loginError) {
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
