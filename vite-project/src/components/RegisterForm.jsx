import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const {postUser} = useUser();
  const [error, setError] = useState('');
  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  const doRegister = async (formData) => {
    setError('');
    try {
      const result = await postUser(formData);
      console.log('Registration result:', result);
    } catch (registrationError) {
      console.error('Registration failed:', registrationError);
      setError(
        registrationError instanceof Error
          ? registrationError.message
          : 'Registration failed.',
      );
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doRegister, initValues);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
};

export default RegisterForm;
