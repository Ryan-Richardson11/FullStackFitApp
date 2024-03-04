import React, { useState } from 'react';
import './App.css';
import CreateUserAccount from './createUserAccount';
import SetGoals from './setGoals';
import UserLogin from './userLogin';
import AllUsers from './admin';
import LogExercise from './logExercies';
import TrackProgress from './trackProgress';
import { logOut } from './utilities';

/*
Homepage for application
Contains menu for other components as well as login and create user account
admin.js function AllUsers called for development purposes
*/

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    // Redirects to page based on button click
    switch (currentPage) {
      case 'setGoals':
        return <SetGoals />;
      case 'logExercise':
        return <LogExercise />
      case 'trackProgress':
        return <TrackProgress />

      default:
        return (
          <div>
            <div className='Title-home'>
              <div className='title-text'>
                <button onClick={() => logOut()}>
                  Log Out
                </button>
                <h1>Reps</h1>
              </div>
            </div>
            <div className="App">
              <div className="center-column">
                <div className="log-button-home">
                  <button onClick={() => setCurrentPage('logExercise')}>
                    Log Exercise
                  </button>
                </div>
                <div className="goal-button-home">
                  <button onClick={() => setCurrentPage('setGoals')}>
                    Set Goals
                  </button>
                </div>
                <div className="track-button-home">
                  <button onClick={() => setCurrentPage('trackProgress')}>
                    Track Progress
                  </button>
                  <AllUsers />
                </div>
              </div>
              <CreateUserAccount />
              <UserLogin />
            </div>
          </div >
        );
    }
  };

  return <>{renderPage()}</>;
}

export default App