import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';
import TodoList from './TodoList';
import RegistrationForm from './RegistrationForm';
import Login from './Login';
import Profile from './Profile';
import { getCookie } from './cookieUtils';
import './App.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

function TodoHome() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <h1 className='title' onClick={navigateHome}>Todo List</h1>
  );
}

function TopButtons() {
  let location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (location.pathname === '/') {
    return (
      <>
        <button className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
        <button className="top-login-button" onClick={handleLogin}>Login</button>
      </>
    );
  }

  return null;
}

function App() {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const checkUsername = async () => {
      const idToken = getCookie('idToken');
      if (idToken) {
        try {
          const response = await axios.get(`http://localhost:5000/getUsername/${idToken}`);
          const { username } = response.data;
          setUsername(username);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching username:', error);
          setUsername('');
          setIsLoggedIn(false);
        }
      } else {
        setUsername('');
        setIsLoggedIn(false);
      }
    };

    checkUsername();

  }, [isLoggedIn]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <div className="header">
          <button className="toggle-theme-button" onClick={toggleTheme}>
            {theme === 'light' ? 'Use Dark Mode' : 'Use Light Mode'}
          </button>
          {isLoggedIn ? (
            <Link
              to="/profile"
              style={{ color: theme === 'light' ? 'blue' : 'yellow' }}
            >
              Welcome {username}
            </Link>
          ) : (
            <TopButtons />
          )}
        </div>
        <TodoHome />
        <Routes>
          <Route path="/register" element={<RegistrationForm theme={theme} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login theme={theme} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;