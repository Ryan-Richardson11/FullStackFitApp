## Full Stack Fitness Tracking Application (Django + React.js)

## This project employs a React frontend that interacts with a Django backend and MySQL database.

## Table of Contents

- Token based user creation, login, and authentication
- Set Goals desired to reach
- Update your current metrics each day
- Track progress towards current goals
- Tracks weight, benchpress, squats, and deadlifts

##User Create Account:

- Users are prompted to create an account upon opening the home page.

- Account creation is necessary for all functions of the application to be tracked.


## User Login:

- Users are prompted to login on the home page.

- Upon logging in, a request is sent to the backend user_login() and a unique token is returned and stored in session storage.

- The token is then used for all subsequent calls to the backend to send and retrieve information distinctive to that user.

- Errors are handled based on no authentication token being found in the request.


## Set Goals:

- Fulling logged in users can press the set goals button which will render a set goals form.

- The form will present weight, benchpress, squat, and deadlift fields to be filled in (lbs).

- A request with a authentication token will be sent to set_goals() on the backend, which will update the users goal in the database.


## Log Exercise:

- Fulling logged in users can press the set goals button which will render a log today's metrics form.

- The form will present weight, benchpress, squat, and deadlift fields to be filled in (lbs).

- A request with a authentication token will be sent to log_exercise() on the backend, which will update the users current metrics in the database.


## Track Progress:

- The user must be logged have been issued a token.

- Clicking this button will render a component showing how close users are to a goal along with a graphical representation.

- A call is made to the backend for track_progress(), where a calculation is performed to get the users current progress towards their goal.

- All values are drawn out on a progress bar chart along with percentages.
