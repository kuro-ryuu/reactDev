import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <section>
      {showRegistration ? <RegisterForm /> : <LoginForm />}
      <button
        type="button"
        onClick={() => setShowRegistration((current) => !current)}
      >
        {showRegistration ? 'Log in' : 'Register'}
      </button>
    </section>
  );
};

export default Login;
