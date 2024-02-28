import React, { useState, useEffect } from 'react'

function SetGoals() {

    const [userGoals, setUserGoals] = useState({
        weight: '',
        benchpress: '',
        squat: '',
        deadlift: '',
    });

    const [currentGoals, setCurrentGoals] = useState({
        weight: '',
        benchpress: '',
        squat: '',
        deadlift: '',
    });

    // Fetches current goals from the back end 

    const fetchGoals = async () => {
        try {
            const authToken = sessionStorage.getItem('authToken');
            if (!authToken) {
                console.error('No auth token found');
                return;
            }

            console.log('Received Token:', authToken);

            const response = await fetch('http://localhost:8000/api/get_goals', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Update the state with the fetched goals
                setCurrentGoals(data);
            } else if (response.status === 401) {
                console.error('Unauthorized - Clearing auth token');
                localStorage.removeItem('authToken');
            }
            else {
                console.error('Error fetching goals');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Call the fetchGoals function when the component mounts; empty array ensures effect runs once
    useEffect(() => {
        fetchGoals();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserGoals({
            ...userGoals,
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
        console.log('userGoals:', userGoals);

        const numericUserGoals = {
            weight: parseFloat(userGoals.weight),
            benchpress: parseFloat(userGoals.benchpress),
            squat: parseFloat(userGoals.squat),
            deadlift: parseFloat(userGoals.deadlift),
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
                fetchGoals();
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
                <h2 style={styles.h2}>Goals</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={styles.label}>
                        Weight:
                        <input
                            type="number"
                            name="weight"
                            value={userGoals.weight}
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
                            value={userGoals.benchpress}
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
                            value={userGoals.squat}
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
                            value={userGoals.deadlift}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </label>
                    <br />
                    <button type="submit" style={styles.button}>Set Goals</button>
                </form>
                <div className='current-goals'>
                    <h3>Current Goals</h3>
                    <p>Weight: {currentGoals.weight}</p>
                    <p>Benchpress: {currentGoals.benchpress}</p>
                    <p>Squat: {currentGoals.squat}</p>
                    <p>Deadlift: {currentGoals.deadlift}</p>
                </div>
            </div>
        </div>
    );
}
export default SetGoals;