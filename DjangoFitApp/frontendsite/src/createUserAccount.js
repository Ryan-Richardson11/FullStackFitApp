import React, { useState } from 'react'

function CreateUserAccount() {
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

    // Handles form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

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
            } else {
                console.error('Error creating user');
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
            </form>
        </div>
    );
};
export default CreateUserAccount;