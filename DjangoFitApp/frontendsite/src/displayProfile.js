import React, { useState, useEffect } from 'react'
import { setProfilePicture } from './utilities';

function DisplayProfile() {

    const [userProfile, setUserProfile] = useState({
        picture: null,
        username: '',
        email: ''
    });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log('Selected File:', file);
        await setProfilePicture(file);
        await fetchProfile();
    };

    const fetchProfile = async () => {
        try {
            const authToken = sessionStorage.getItem('authToken');
            if (!authToken) {
                console.error('No auth token found');
                return null;
            }

            console.log('Received Token:', authToken);

            const response = await fetch('http://localhost:8000/api/display_profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserProfile(data);
            } else {
                console.error('Error fetching profile');
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    /*
`   Full CSS for user profile component
   */
    const styles = {
        userProfile: {
            backgroundColor: '#1f2d58',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: '10px',
            right: '30px',
            padding: '20px',
            width: '250px',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
            boxShadow: '0px -1px 10px -4px rgba(0, 0, 0, 0.75)',
        },

        profilePicture: {
            marginRight: '10px', // Add margin between picture and text
            borderRadius: '50%', // Make it a circle
            overflow: 'hidden', // Ensure the image stays within the circle
            width: '50px', // Adjust the width as needed
            height: '50px', // Adjust the height as needed
            cursor: 'pointer',
            outline: 'none',
            position: 'relative',
        },

        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },

        profileUsername: {
            fontSize: '24px',
            fontWeight: 'bold'
        },

        profileEmail: {
            fontSize: '12px'
        }
    }

    return (
        <div>
            <div className='user-profile' style={styles.userProfile}>
                <label htmlFor="fileInput" className='profile-picture' style={styles.profilePicture}>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <img alt='ProfilePicture' src={userProfile.picture} onClick={() => document.getElementById('fileInput').click()} />
                    <div style={{ marginTop: '5px', cursor: 'pointer', color: '#fff' }}>Change Picture</div>
                </label>
                <div className='text-container' style={styles.textContainer}>
                    <div className='profile-username' style={styles.profileUsername}>
                        <p1>{userProfile.username}</p1>
                    </div>
                    <div className='profile-email' style={styles.profileEmail}>
                        <p2>{userProfile.email}</p2>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DisplayProfile;