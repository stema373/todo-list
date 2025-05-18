import React from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { removeCookie } from './cookieUtils';

function Profile({ setIsLoggedIn }: { setIsLoggedIn: (b: boolean) => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        removeCookie('idToken');
        setIsLoggedIn(false);

        navigate('/');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Profile;