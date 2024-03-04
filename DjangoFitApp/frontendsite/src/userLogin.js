import React, { useState } from 'react'
import { getAuthToken } from './utilities';

function UserLogin() {
    // Data needed for the user to login 
    const [userData, setUserData] = useState({
        username: '',
        password: '',

    });

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    /*
    Calls getAuthToken from the utility.js file
    Request is sent to backend and a token is returned if the user is present
    Token is stored in session storage while the user interacts with the functions
    Token is used for subsequent actions on the frontend
    */
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await getAuthToken(userData);

            // Store the token
            sessionStorage.setItem('authToken', token);

            console.log('Successfully logged in');
        } catch (error) {
            console.error('Error:', error);
        }

        // Clear form
        setUserData({
            username: '',
            password: '',
        });
    }

    const styles = {
        UserLogin: {
            position: 'fixed',
            top: '150px',
            left: '30px',
            width: '250px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#599cd3',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        h2: {
            marginBottom: '10px',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
        },
        input: {
            width: 'calc(100% - 16px)',
            padding: '8px',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };

    return (
        <div className="user-create-account" style={styles.UserLogin}>
            <h2>User Login</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default UserLogin;