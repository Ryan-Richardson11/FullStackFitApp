import React, { useState } from 'react'

function CreateUserAccount() {
    // Values needed to create user account
    const [userData, setUserData] = useState({
        username: '',
        email: '',
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
    Fetch request to backend create_user
    Checks if the user already exists
    If not a new user is created and stored in the database
    */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        var outputMessage = document.getElementById('outputMessage');

        try {
            console.log('User Data:', userData);
            const response = await fetch('http://localhost:8000/api/create_user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // Check if the request was successful
            if (response.ok) {
                console.log('User created successfully');
                outputMessage.innerText = 'User created successfully!';
                outputMessage.style.color = '#4caf50'
            } else {
                console.error('Error creating user');
                outputMessage.innerText = 'Unable to create user';
                outputMessage.style.color = '#FF0000'
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // Clear form
        setUserData({
            username: '',
            email: '',
            password: '',
        });
    }

    return (
        <div className="user-create-account">
            <h2>Create an Account</h2>
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
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
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
                <button type="submit">Create Account</button>
                <p id='outputMessage'></p>
            </form>
        </div>
    );
};
export default CreateUserAccount;