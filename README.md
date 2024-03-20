## Reps - Full Stack Fitness Tracking Application (Django + React.js)

- This project employs a React frontend that interacts with a Django backend and MySQL database.

## Table of Contents

- [User Create Account](#user-create-account)
- [User Login](#user-login)
- [Set Goals](#set-goals)
- [Log Exercise](#log-exercise)
- [Track Progress](#track-progress)

## User Create Account:

- Users are prompted to create an account upon opening the home page.

- Account creation is necessary for all functions of the application to be tracked.


![HomePage](https://github.com/Ryan-Richardson11/FullStackFitApp/assets/125044341/1e718cac-0738-44e7-b32a-35c4f3107a86)



## User Login:

- Users are prompted to login on the home page.

- Upon logging in, a request is sent to the backend user_login() and a unique token is returned and stored in session storage.

- The token is then used for all subsequent calls to the backend to send and retrieve information distinctive to that user.

- The user has the option to log out on the home page which will remove the token from session storage and prevent further api requests.

- Errors are handled based on no authentication token being found in the request.

- User Profile is fetched with a profile picture, username, and email upon login. Profile component is mounted on each subseqent page unitl the user logs out.


## Set Goals:

- Fulling logged in users can press the set goals button which will render a set goals form.

- The form will present weight, benchpress, squat, and deadlift fields to be filled in (lbs).

- A request with a authentication token will be sent to set_goals() on the backend, which will update the users goal in the database.


![SetGoals](https://github.com/Ryan-Richardson11/FullStackFitApp/assets/125044341/b48db05a-b264-4542-b5e6-43bd45783cd2)


## Log Exercise:

- Fulling logged in users can press the set goals button which will render a log today's metrics form.

- The form will present weight, benchpress, squat, and deadlift fields to be filled in (lbs).

- A request with a authentication token will be sent to log_exercise() on the backend, which will update the users current metrics in the database.


![LogExercise](https://github.com/Ryan-Richardson11/FullStackFitApp/assets/125044341/782e5d3d-049a-456a-b74c-7590fc3edea1)


## Track Progress:

- The user must be logged have been issued a token.

- Clicking this button will render a component showing how close users are to a goal along with a graphical representation.

- A call is made to the backend for track_progress(), where a calculation is performed to get the users current progress towards their goal.

- All values are drawn out on a progress bar chart along with percentages.


![TrackProgress](https://github.com/Ryan-Richardson11/FullStackFitApp/assets/125044341/a67cd8b6-7692-44db-b288-aeccf0408bef)


