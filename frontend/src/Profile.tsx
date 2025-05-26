import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { removeCookie } from './cookieUtils';

function Profile({ setIsLoggedIn }: { setIsLoggedIn: (b: boolean) => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No user logged in');
        }

        const idToken = await user.getIdToken();
        const response = await fetch(`http://localhost:5000/getUsername/${idToken}`);
        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [auth]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        removeCookie('idToken');
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No user logged in');
        }

        const uid = user.uid;
        console.log('Attempting to delete account with uid:', uid);
        
        // Delete the account using the uid
        const response = await fetch(`http://localhost:5000/deleteAccount/${uid}`, {
          method: 'DELETE',
        });

        console.log('Delete response status:', response.status);
        const responseText = await response.text();
        console.log('Delete response text:', responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.error('Failed to parse response as JSON:', e);
          throw new Error('Server returned invalid response');
        }

        if (!response.ok) {
          throw new Error(data.details || data.error || 'Failed to delete account');
        }

        // Sign out and redirect to login
        await auth.signOut();
        removeCookie('idToken');
        setIsLoggedIn(false);
        navigate('/');
      } catch (error: any) {
        console.error('Error deleting account:', error);
        alert(error.message || 'Failed to delete account. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2 className="profile-title">Profile</h2>
      <p className="profile-info">Username: {username}</p>
      <p className="profile-info">Email: {auth.currentUser?.email}</p>
      <div className="profile-buttons">
        <button onClick={handleLogout} className="logout-button">Log Out</button>
        <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
      </div>
    </div>
  );
}

export default Profile;