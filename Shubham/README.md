# Note-keeper with Auth

Hosting: server with heroku and react with Netlify

Database:MongoDB(mongoose)(Hosting with ATLAS)

### Website link:https://s-mittal.netlify.app/

To clone:https://github.com/shubhamg20/Assignment-1.git

 **frontend** React.js using Hooks
 
 1.using react-router-dom for navigation
 
 2.using some bootstrap classes in navbar and in login and register page
 
 3.using fetch Post to connect with backend restful api
 
 4. import {useState} from 'react' for managing the states. 
 
 **backend** Node,express.js,mongoose
 
 1.express.Router for get post request 
 
 2.body-parser to parse the client data
 
 3.two mongoose.models of one user and other is of notes
 
Pending work:

1. on reloading notes do not show, atleast one add note is required to show all the notes on 
2. on fetching post, req.body in backend will give object having needed data in a key so i use JSON.parse(Object.Keys(req.body)[0])



 

