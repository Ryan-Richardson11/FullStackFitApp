/*
Fetch method to django backend.
No current authentication needed
Returns token if user is present in MySQL database
Called in handleFormSubmit() function in userLogin.js file
*/
export const getAuthToken = async (userData) => {
    try {
        const response = await fetch(`http://localhost:8000/api/user_login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            console.log('Received Token:', token);
            return token;
        } else {
            console.log('Error logging in');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

// Logs user out of the current session
export const logOut = () => {
    sessionStorage.removeItem('authToken');
    console.log("Successfully Logged out")
}

// Sets a new profile picture for the user
export const setProfilePicture = async (file) => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
            console.error('No auth token found');
            return null;
        }

        const formData = new FormData();
        formData.append('picture', file);

        const response = await fetch(`http://localhost:8000/api/set_picture/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
            body: formData,
        });

        if (response.ok) {
            console.log('Profile picture updated successfully');
        } else {
            console.error('Error updating profile picture');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.message);
    }
};

