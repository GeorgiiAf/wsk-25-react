import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useState } from 'react';

const Login = () => {
    const [formToggle, setFormToggle] = useState(true);
    const clickHandler = () => {
        setFormToggle(!formToggle);
    };

    return (
        <div>
            {formToggle ? <LoginForm /> : <RegisterForm />}

            <button onClick={clickHandler}>
                {formToggle ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Login;
