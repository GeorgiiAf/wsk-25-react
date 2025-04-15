import { useUser } from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
    const { postUser } = useUser();

    const initValues = {
        username: '',
        password: '',
        email: '',
    };

    const doRegister = async () => {
        console.log('Register funktiota kutsuttu');
        console.log(inputs);
        await postUser(inputs);
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(
        doRegister,
        initValues,
    );

    console.log(inputs);

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="registeruser">Username</label>
                    <input
                        name="username"
                        type="text"
                        id="loginuser"
                        onChange={handleInputChange}
                        autoComplete="username"
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
                    />
                </div>
                <div>
                    <label htmlFor="registerpassword">Password</label>
                    <input
                        name="password"
                        type="password"
                        id="registerpassword"
                        onChange={handleInputChange}
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default RegisterForm;
