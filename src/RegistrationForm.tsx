import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setCookie } from './cookieUtils';
import axios from 'axios';

function RegistrationForm({ theme, setIsLoggedIn }: { theme: string; setIsLoggedIn: (b: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isValidUsername = (username: string) => {
    // eslint-disable-next-line
    const pattern = /^[a-zA-Z0-9\.]{3,20}$/;
    return pattern.test(username);
  };

  const formatErrorMessage = (errorCode: string, errorMessage: string) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email already in use.';
      case 'auth/invalid-email':
        return 'Invalid email.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/missing-password':
        return 'Please enter a password.';
      default:
        return errorMessage;
    }
  };

  const createUser = () => {
    axios
      .post('http://localhost:5000/register', { username, email, googleSignIn: false }, { headers: { 'content-type': 'application/json' } })
      .then(response => {
        setErrorMessage('');
        console.log(response.data.message);
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
        console.error(error.response.data.message);
      });
  };

  const signUp = async () => {
    if (!isValidUsername(username)) {
      setErrorMessage('Username must be between 3 and 20 characters long and can only contain letters, numbers, and periods.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      createUser();
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      setCookie("idToken", idToken, 1)
      console.log('Signed up user:', user);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Sign-up error:', errorCode, errorMessage);
      setErrorMessage(formatErrorMessage(errorCode, errorMessage));
    };
  };

  return (
    <div className={`registration-container ${theme}`}>
      <h2>Create a new account</h2>
      <div className={`registration-box ${theme}`}>
        <div className="form-group">
          <input
            className="login-input custom-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="login-input custom-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="login-input custom-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="login-input custom-input"
            type="password"
            placeholder="Retype Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="register-button" onClick={signUp}>
            Sign Up
          </button>
        </div>
        <div className="form-group">{errorMessage && <p className="error-message">{errorMessage}</p>}</div>
        <div className="form-group">
          <Link
            to='/login'
            style={{ color: theme === 'light' ? 'blue' : 'yellow' }}
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;