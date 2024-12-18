import React, { useEffect, useState } from 'react';
import classes from './Login.module.scss';
import loginImage from '../../assets/login.svg';
import googleImage from '../../assets/google.svg';
import facebookImage from '../../assets/facebook.svg';
import emailImage from '../../assets/email.svg';
import userImage from '../../assets/user.svg';
import passwordImage from '../../assets/password.svg';
import eyeImage from '../../assets/eye.svg';
import hideeyeImage from '../../assets/hideeye.svg';
import { validateName, validateEmail, validatePassword } from '../../utils/formValidation';
import { localStorageKeys } from '../../interfaces/localStorage.interface';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface Errors {
    name?: string;
    email?: string;
    password?: string;
}


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState(false);
     useEffect(() => {
        const userData = localStorage.getItem(localStorageKeys.USER_DATA);
        const authToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);

        if (userData && authToken) {
            navigate('/home');
        }
    }, [navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [id]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [id]: undefined }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate inputs
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        const validationErrors: Errors = {
            name: nameError,
            email: emailError,
            password: passwordError,
        };

        setErrors(validationErrors);

        if (nameError || emailError || passwordError) {
            return;
        }

        const payload = {
            username: formData.name,
            password: formData.password,
            expiresInMins: 1,
        };

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem(
                localStorageKeys.USER_DATA,
                JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    image: data.image,
                    gender: data.gender,
                    email: data.email,
                })
            );
            localStorage.setItem(
                localStorageKeys.AUTH_TOKEN,
                data.accessToken
            );
            navigate('/home')
            console.log('Login successful:', data);
            alert('Login successful!');
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error during login:', err.message);
                alert(err.message || 'An error occurred during login.');
            } else {
                console.error('An unexpected error occurred:', err);
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className={classes["login"]}>
            <div className={classes['image']}>
                <img src={loginImage} alt='login image' className={classes['login-image']} />
            </div>
            <div className={classes['login-form']}>
                <div className={classes['welcome-message']}>Welcome to</div>
                <div className={classes['platform-name']}>Unstop</div>
                <div className={classes['platfrom-login']}>
                    <img src={googleImage} alt='google image' className={classes['platform-image']} /> Login with Google
                </div>
                <div className={classes['platfrom-login']}>
                    <img src={facebookImage} alt='facebook image' className={classes['platform-image']} /> Login with Facebook
                </div>
                <div className={classes['divider']}>
                    <span className={classes['divider-text']}>OR</span>
                </div>
                <form onSubmit={handleFormSubmit}>
                    {/* Name Input */}
                    <div className={classes['input-container']}>
                        <div className={classes['icon-wrapper']}>
                            <img src={userImage} alt='user' className={classes['icon']} />
                        </div>
                        <div className={classes['input-wrapper']}>
                            <label className={classes['label']} htmlFor="name">User name</label>
                            <input
                                id="name"
                                type="text"
                                className={classes['input-field']}
                                placeholder="username"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.name && <div className={classes['error-message']}>{errors.name}</div>}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className={classes['input-container']}>
                        <div className={classes['icon-wrapper']}>
                            <img src={emailImage} alt='email' className={classes['icon']} />
                        </div>
                        <div className={classes['input-wrapper']}>
                            <label className={classes['label']} htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="text"
                                className={classes['input-field']}
                                placeholder="username@gmail.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && <div className={classes['error-message']}>{errors.email}</div>}
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className={classes['input-container']}>
                        <div className={classes['icon-wrapper']}>
                            <img src={passwordImage} alt='password' className={classes['icon']} />
                        </div>
                        <div className={classes['input-wrapper']}>
                            <label className={classes['label']} htmlFor="password">Password</label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={classes['input-field']}
                                placeholder="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.password && <div className={classes['error-message']}>{errors.password}</div>}
                        </div>
                        <div
                            className={classes['eye-icon-wrapper']}
                            onClick={togglePasswordVisibility}
                        >
                            <img
                                src={showPassword ? hideeyeImage : eyeImage}
                                alt={showPassword ? 'Hide password' : 'Show password'}
                                className={classes['icon']}
                            />
                        </div>
                    </div>

                    <div className={classes['auth-options']}>
                        <div className={classes['remember-me']}>
                            <input type="checkbox" id="checkbox4" className={classes['checkbox']} />
                            Remember me
                        </div>
                        <div className={classes['forgot-password']}>
                            Forgot Password?
                        </div>
                    </div>

                    <button type="submit" className={classes['login-container']}>
                        Login
                    </button>
                </form>

                <div className={classes['register-container']}>
                    Don’t have an account?
                    <div className={classes['register']}>
                        Register
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
