import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setCookie } from './cookieUtils';

function Login({ theme, setIsLoggedIn }: { theme: string; setIsLoggedIn: (b: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const navigateSignUp = () => {
    navigate('/register');
  };

  const signIn = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      setCookie('idToken', idToken, 1);
      console.log('Logged in user:', user);
      setMessage('Login successful');
      setErrorMessage('');
      setIsLoggedIn(true);
      navigate('/');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login error:', errorCode, errorMessage);
      setMessage('');
      setErrorMessage(errorMessage);
    };
  };

  return (
    <div className={`registration-container ${theme}`}>
      <h2>Log In</h2>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="login-button" onClick={signIn}>
            Log In
          </button>
        </div>
        <div className="form-group">{message && <p>{message}</p>}{errorMessage && <p className="error-message">{errorMessage}</p>}</div>
        <div className="form-group">
          <button onClick={navigateSignUp}>Create a new account</button>
        </div>
      </div>
    </div>
  )
}

export default Login;