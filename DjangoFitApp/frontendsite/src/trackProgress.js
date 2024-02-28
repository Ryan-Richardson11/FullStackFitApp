import React, { useState, useEffect } from 'react'

function TrackProgress() {

    const [userProgress, setUserProgress] = useState({
        weight: '',
        benchpress: '',
        squat: '',
        deadlift: '',
    });

    const fetchProgress = async () => {
        try {
            const authToken = sessionStorage.getItem('authToken');
            if (!authToken) {
                console.error('No auth token found');
                return;
            }

            console.log('Received Token:', authToken);

            const response = await fetch('http://localhost:8000/api/track_progress', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Update the state with the fetched progress
                setUserProgress(data);
            } else if (response.status === 401) {
                console.error('Unauthorized - Clearing auth token');
                localStorage.removeItem('authToken');
            }
            else {
                console.error('Error fetching Progress');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Call the fetchGoals function when the component mounts; empty array ensures effect runs once
    useEffect(() => {
        fetchProgress();
    }, []);


    /*
`   Full CSS for goals form submission component
    */
    const styles = {
        userProgress: {
            backgroundColor: '#11a5c0',
            margin: '10px auto',
            padding: '20px',
            width: '250px',
            border: '1px solid #599cd3',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        heading: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '15px',
        },
        paragraph: {
            fontSize: '16px',
            fontWeight: 'normal',
            marginBottom: '10px',
        },
        progressBar: {
            height: '40px',
            width: '75%',
            backgroundColor: '#ddd',
            borderRadius: '8px',
            overflow: 'hidden',
        },
        loadingWeight: {
            height: '100%',
            width: `${userProgress.weight}%`,
            backgroundColor: 'green',
            borderRadius: '8px',
            transition: 'width 0.5s ease-in-out',
        },
        loadingBenchpress: {
            height: '100%',
            width: `${userProgress.benchpress}%`,
            backgroundColor: 'green',
            borderRadius: '8px',
            transition: 'width 0.5s ease-in-out',
        },
        loadingSquat: {
            height: '100%',
            width: `${userProgress.squat}%`,
            backgroundColor: 'green',
            borderRadius: '8px',
            transition: 'width 0.5s ease-in-out',
        },
        loadingDeadlift: {
            height: '100%',
            width: `${userProgress.deadlift}%`,
            backgroundColor: 'green',
            borderRadius: '8px',
            transition: 'width 0.5s ease-in-out',
        },
    };

    return (
        <div>
            <div className='user-progress' style={styles.userProgress}>
                <h3>Progress</h3>
                <p>Weight: {userProgress.weight} %</p>
                <p>Benchpress: {userProgress.benchpress} %</p>
                <p>Squat: {userProgress.squat} %</p>
                <p>Deadlift: {userProgress.deadlift} %</p>
            </div>
            <br />
            <div style={styles.progressBar}>
                <div style={styles.loadingWeight}>
                    {userProgress.weight}%
                </div>
            </div >
            <br />
            <div style={styles.progressBar}>
                <div style={styles.loadingBenchpress}>
                    {userProgress.benchpress}%
                </div>
            </div>
            <br />
            <div style={styles.progressBar}>
                <div style={styles.loadingSquat}>
                    {userProgress.squat}%
                </div>
            </div>
            <br />
            <div style={styles.progressBar}>
                <div style={styles.loadingDeadlift}>
                    {userProgress.deadlift}%
                </div>
            </div>
        </div >
    );
}
export default TrackProgress;