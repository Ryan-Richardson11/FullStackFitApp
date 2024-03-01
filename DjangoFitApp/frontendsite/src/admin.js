import React, { useEffect } from 'react';

function AllUsers() {
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get_all_users');
                if (response.ok) {
                    const data = await response.json();
                    console.log('All Users:', data.users);
                } else {
                    console.error('Error fetching all users');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAllUsers();
    }, []); // The empty dependency array ensures the effect runs only once on component mount

    // You can return some content or null based on your needs
}

export default AllUsers;