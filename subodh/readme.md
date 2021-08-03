
the site is running at https://frosty-heisenberg-f781a3.netlify.app

--FRONTEND--

1: this app works on react.js, jwt token+ passport(third party) for authentication ,mongoose for models 
2: i have used express generator and create react app commands to build basic environment
3: firstly it has main component in the component folder where i have used fetch request in componentDidMount to fetch the existing notes.

4: if above fetch request suceeds then i set the notes state to the fetched notes and if it gives error 401 (unauthorized) then i set the notes state to null.

5: then in the same main component if the (notes) state is null (which implies user do not have jwt token) then i render the login component if it succeeds then i set the jwt token as cookie 

6: in the login component i have signup button whitch on clicked changes the state accountexist to false (which is by default true ***{login component is rendered only when accountExists is true})

7: after accountExists is set to false app renders the signup page in which you have to enter *unique* username, password and *optional* firstName ,lastName ahter which if you click signup button your account is created and accountexists is again set to true and login page is again rerendered.

8: after entering correct credentials to login form i again made fetch request (in background) to existing notes using cookie which is set up in step 5 and set up the (notes) state to fetched notes.

9: after successfully retrieving existing notes homepage is rendered which has three components navbar,savenote,existingnotes and

10: navbar has three options for
        (i) homepage which onclicked changes the (*active* which is already set to home by default) state to home 
        (ii) important (onclick changes *active* state to important ) which fetched notes with important entry set to true -> this is to show notes which are marked important
        (iii) logout whitch onclicked destroys the jwt cookie and set notes state to null so that login form is rerendered (check points 4 and 5)

11: existingnotes has three categories 
        (i) notes which are usual has title, body and threedot(img) at top right corner which on clicked changes the options state to note._id which renders the three options on the clicked note 
                (i) delete
                (ii) edit (onclicked chages the editableNote state to note._id) -> renders the note with content editable (for title and body) onclicked save button saved the current(edited) note
                (iii) important (onclicked set the important property(of clicked note) to true )
        (ii)notes whose id matches with options state(check 11(i)) render the above three options
        (iii) notes whose id matches with editableNote state ( check 11(i(ii)))


--BACKEND--

1: i have used aws server to listen for requests and mongoAtlas database 

2: the server is running at port 3100 (check bin/www.js )

2: i have two models users and notes 
3: users is for storing username and password firstname lastName

4: notes has title ,body, important (which is by default set to false) and user_id(user._id who has saved that note)

5: i have two routes

        (i) users -> (a)get request does nothing
                     (b) post request is for signup
                     (c) post requset on users/login is for login

        (ii) savenote -> (a) get requset simply returns savednote with user_id==req.user._id    (since after authentictaing(check authenticate.js) user is loaded to request)
                        (b) post request simply save the notes and in response send that note(so that in frontend this note is concat to the notes state)
                         (c) savenote/:noteId supports put and delete request which is used to delet and update the request respectively
                         (d)savenote/important supports get request which sends the notes whose user_id==req.user._id && important == true
                         (e)savenote/:noteId/important supports post request(it set the important property of the note._id==req.params.noteId to true) and delete request (it set the important property of the note._id==req.params.noteId to false)

6: the different routes restricted to only some origin (see cors.js)