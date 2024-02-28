import React, { useState } from 'react'

function LogExercise() {

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

    // Handles form submission and make a call to the backend to update
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
            console.error('No auth token found');
            return;
        }

        console.log('Received Token:', authToken);
        console.log('userGoals:', userCurrent);

        const numericUserGoals = {
            weight: parseFloat(userCurrent.weight),
            benchpress: parseFloat(userCurrent.benchpress),
            squat: parseFloat(userCurrent.squat),
            deadlift: parseFloat(userCurrent.deadlift),
        };

        try {

            const response = await fetch('http://localhost:8000/api/set_goals/', {
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
                console.log('Goals set successfully');
            } else {
                console.error('Error setting goals');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /*
`   Full CSS for goals form submission component
    */
    const styles = {
        setGoalForm: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        setUserGoals: {
            position: 'fixed',
            top: '20px',
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
        currentGoals: {
            marginBottom: '10px',
            h3: {
                fontSize: '26px',
                fontWeight: 'bold',
            },
            p: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    };


    return (
        <div className="set-goal-form" style={styles.setGoalForm}>
            <div className="set-user-goals" style={styles.setUserGoals}>
                <h2 style={styles.h2}>Todays Metrics</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={styles.label}>
                        Weight:
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
                        Benchpress:
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
                        Squat:
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
                        Deadlift:
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
    );
}
export default LogExercise;