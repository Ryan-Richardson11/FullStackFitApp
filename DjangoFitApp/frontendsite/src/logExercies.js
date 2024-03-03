import React, { useState } from 'react'
import TrackProgress from './trackProgress';
import SetGoals from './setGoals';
import App from './App';

function LogExercise() {
    // Values to be logged for daily metrics
    const [userCurrent, setUserCurrent] = useState({
        weight: '',
        benchpress: '',
        squat: '',
        deadlift: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserCurrent({
            ...userCurrent,
            [name]: value,
        });
    };

    /*
    Converts inputed values to floats
    Fetch request to backend log_exercise
    values are stored in MySQL database as the users current goals
    */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
            console.error('No auth token found');
            return;
        }

        console.log('Received Token:', authToken);

        const numericUserGoals = {
            weight: parseFloat(userCurrent.weight),
            benchpress: parseFloat(userCurrent.benchpress),
            squat: parseFloat(userCurrent.squat),
            deadlift: parseFloat(userCurrent.deadlift),
        };

        try {

            const response = await fetch('http://localhost:8000/api/log_exercise/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,

                },
                body: JSON.stringify(numericUserGoals),
            });

            // Check if the request was successful
            if (response.ok) {
                // Fetch goals again to get the updated goals
                console.log('Todays Metrics Updated');
            } else {
                console.error('Error setting goals');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // Clear form
        setUserCurrent({
            weight: '',
            benchpress: '',
            squat: '',
            deadlift: '',
        });
    };

    /*
`   Full CSS for log exercise form submission component
    */
    const styles = {
        logExerciseForm: {
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
        logExercise: {
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
                        </div>
                        <div className="log-exercise-form" style={styles.logExerciseForm}>
                            <div className="log-exercise" style={styles.logExercise}>
                                <h2 style={styles.h2}>Today's Metrics</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <label style={styles.label}>
                                        Weight (lbs):
                                        <input
                                            type="number"
                                            name="weight"
                                            value={userCurrent.weight}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </label>
                                    <br />
                                    <label style={styles.label}>
                                        Benchpress (lbs):
                                        <input
                                            type="number"
                                            name="benchpress"
                                            value={userCurrent.benchpress}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </label>
                                    <br />
                                    <label style={styles.label}>
                                        Squat (lbs):
                                        <input
                                            type="number"
                                            name="squat"
                                            value={userCurrent.squat}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </label>
                                    <br />
                                    <label style={styles.label}>
                                        Deadlift (lbs):
                                        <input
                                            type="number"
                                            name="deadlift"
                                            value={userCurrent.deadlift}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </label>
                                    <br />
                                    <button type="submit" style={styles.button}>Submit Todays Metrics</button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
        }
    };
    return <>{renderPage()}</>;
}
export default LogExercise;