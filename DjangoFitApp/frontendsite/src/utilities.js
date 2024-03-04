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
            throw new Error('Error logging in');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logOut = () => {
    sessionStorage.removeItem('authToken');
    console.log("Successfully Logged out")
}