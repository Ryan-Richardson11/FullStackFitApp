import React, { useState, useEffect, useRef } from 'react'
import { setProfilePicture } from './utilities';

function DisplayProfile() {

    const [userProfile, setUserProfile] = useState({
        picture: '',
        username: '',
        email: ''
    });

    // Used to prevent file manager from opening twice
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        event.stopPropagation();
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
        const fetchData = async () => {
            await fetchProfile();
        };

        fetchData();
    }, []);

    /*
`   Full CSS for user profile component
   */
    const styles = {
        userProfile: {
            backgroundColor: '#1f2d58',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            top: '10px',
            right: '10px',
            padding: '20px',
            width: '250px',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
            boxShadow: '0px -1px 10px -4px rgba(0, 0, 0, 0.75)',
            position: 'absolute',
        },

        profilePicture: {
            borderRadius: '50%',
            overflow: 'hidden',
            width: '75px',
            height: '75px',
            cursor: 'pointer',
            outline: 'none',
            position: 'relative',
        },

        profilePictureImage: {
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
        },

        textContainer: {
            flexDirection: 'column',
            textAlign: 'left',
            height: '70px',
            width: '175px',
            marginLeft: '100px',
            position: 'absolute',
        },

        profileUsername: {
            fontSize: '30px',
            fontWeight: 'bold',
            margin: '0',
        },

        profileEmail: {
            fontSize: '12px',
            margin: '0',
        }
    }

    return (
        <div>
            <div className='user-profile' style={styles.userProfile}>
                <label htmlFor="fileInput" className='profile-picture' style={styles.profilePicture}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <img
                        alt='ProfilePicture'
                        src={userProfile.picture || '/media/profile_pictures/default.png'}
                        style={styles.profilePictureImage}
                        onClick={() => fileInputRef.current.click()}
                    />
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
        </div >
    );
};
export default DisplayProfile;
