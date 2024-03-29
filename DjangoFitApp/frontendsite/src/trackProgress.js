import React, { useState, useEffect } from 'react'
import SetGoals from './setGoals';
import LogExercise from './logExercies';
import App from './App';
import DisplayProfile from './displayProfile';
import { logOut } from './utilities';

function TrackProgress() {

    const [userProgress, setUserProgress] = useState({
        weight: '',
        benchpress: '',
        squat: '',
        deadlift: '',
    });

    /*
    Sends a request to backend API (track_progress) where the progress is calculated
    Use of authorization token in request
    Returns percentages towards goal and progress bar chart is diplayed
    */
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
        header: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '5px',
            textAlign: 'center',
        },
        progressBar: {
            margin: '10px auto',
            height: '40px',
            width: '75%',
            backgroundColor: '#ddd',
            borderRadius: '8px',
            overflow: 'hidden',
        },
        progressTitle: {
            margin: '0',
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

    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        // Redirects to page based on button click
        switch (currentPage) {
            case 'homePage':
                return <App />
            case 'setGoals':
                return <SetGoals />;
            case 'logExercise':
                return <LogExercise />
            case 'trackProgress':
                return <TrackProgress />

            default:
                return (
                    <div>
                        <div className='Title'>
                            <div className='log-out-button'>
                                <button onClick={() => logOut()}>
                                    Log Out
                                </button>
                            </div>
                            <div className="nav-button">
                                <button onClick={() => setCurrentPage('homePage')}>
                                    Home
                                </button>
                            </div>
                            <div className="nav-button">
                                <button onClick={() => setCurrentPage('logExercise')}>
                                    Log Exercise
                                </button>
                            </div>
                            <div className="nav-button">
                                <button onClick={() => setCurrentPage('setGoals')}>
                                    Set Goals
                                </button>
                            </div>
                            <div className="nav-button">
                                <button onClick={() => setCurrentPage('trackProgress')}>
                                    Track Progress
                                </button>
                            </div>
                            <DisplayProfile />
                        </div>
                        <div className='user-progress' style={styles.userProgress}>
                            <h3>Current Progress</h3>
                            <p>Weight: {userProgress.weight} %</p>
                            <p>Benchpress: {userProgress.benchpress} %</p>
                            <p>Squat: {userProgress.squat} %</p>
                            <p>Deadlift: {userProgress.deadlift} %</p>
                        </div>

                        <div style={styles.progressTitle}>
                            <h4 style={styles.header}>Weight</h4>
                            <div style={styles.progressBar}>
                                <div style={styles.loadingWeight}>
                                    <b>{userProgress.weight}%</b>
                                </div>
                            </div >
                        </div>
                        <br />

                        <div style={styles.progressTitle}>
                            <h4 style={styles.header}>Benchpress</h4>
                            <div style={styles.progressBar}>
                                <div style={styles.loadingBenchpress}>
                                    <b>{userProgress.benchpress}%</b>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div style={styles.progressTitle}>
                            <h4 style={styles.header}>Squat</h4>
                            <div style={styles.progressBar}>
                                <div style={styles.loadingSquat}>
                                    <b>{userProgress.squat}%</b>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div style={styles.progressTitle}>
                            <h4 style={styles.header}>Deadlift</h4>
                            <div style={styles.progressBar}>
                                <div style={styles.loadingDeadlift}>
                                    <b>{userProgress.deadlift}%</b>
                                </div>
                            </div>
                        </div>
                    </div >
                );
        }
    };
    return <>{renderPage()}</>;
}
export default TrackProgress;