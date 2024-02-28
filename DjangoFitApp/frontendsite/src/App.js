import React, { useState } from 'react';
import './App.css';
import CreateUserAccount from './createUserAccount';
import SetGoals from './setGoals';
import UserLogin from './userLogin';
import AllUsers from './admin';
import LogExercise from './logExercies';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    // Redirects to page based on button click
    switch (currentPage) {
      case 'homepage':
        return <CreateUserAccount />;
      case 'setGoals':
        return <SetGoals />;
      case 'logExercise':
        return <LogExercise />

      default:
        return (
          <div className="App">
            <div className="center-column">
              <div className="log-button">
                <button onClick={() => setCurrentPage('logExercise')}>
                  Log Exercise
                </button>
              </div>
              <div className="goal-button">
                <button onClick={() => setCurrentPage('setGoals')}>
                  Set Goals
                </button>
              </div>
              <div className="track-button">
                <button onClick={() => setCurrentPage('trackProgress')}>
                  Track Progress
                </button>
              </div>
              <CreateUserAccount />
              <UserLogin />
              <AllUsers />
            </div>
          </div>
        );
    }
  };

  return <>{renderPage()}</>;
}

export default App;
