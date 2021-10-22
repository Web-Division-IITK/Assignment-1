# This is a code base for a Note-making app created using express for back-end, react for front-end and mongodb for data storage.

# Back-end

1. The code is organised into two directories viz backend and frontend.

2. /backend contains the entry point file viz main.js. 

3. /backend/routeHandler contains the handler functions for register, login, add notes, delete notes and view notes end points.

4. /backend/middleware contains middleware for verifying user identity before accessing /view, /addNotes and /delete end points.

5. User authentication and authorisation is achieved using JSON web tokens. Feature for refreshing tokens is still to be added.

6. MongoDB is used as a database for storing user information. 

# Front-end

1. /frontend/src/App.js is entry point for the app using various react components defined in frontend/src/Components directory.

2. /frontend/src/Components contains the various react components.

# Access the app on https://immense-inlet-55002.herokuapp.com/

