var express = require("express");
var cors = require("cors");
const multer = require("multer");
const app = express();
const upload = multer();
app.use(upload.any());
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const register = require("../models/register.js");
const notes = require("../models/notes.js");
var router = new express.Router();
router.route("/").get((req, res) => {
  console.log("reached");
  res.json({
    name: "shubham",
  });
});

router.post("/register", function (req, res) {
  console.log("done");
  const user = JSON.parse(Object.keys(req.body)[0]);
  const newUser = new register({
    email: user.email,
    password: user.password,
  });
  register.findOne({ email: user.email }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        res.send({ message: "This Email-id is already registered" });
      } else {
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(req.body);
            res.send({ message: "User registered,you can login now" });
          }
        });
      }
    }
  });
});
router.post("/login", function (req, res) {
  const user = JSON.parse(Object.keys(req.body)[0]);
  const username = user.email;
  const password = user.password;
  console.log(username, password);
  register.findOne(
    { email: username, password: password },
    function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          if (foundUser.password === password) {
            res.send({ message: "User login successfully" });
          } else {
            res.send({ message: "invalid username" });
          }
        } else {
          res.send({ message: "User not found" });
          console.log("no user");
        }
      }
    }
  );
});

router
  .route("/notes")
  .get((req, res) => {
    notes.find({}, (error, allNotes) => {
      if (error) console.log(error);
      else {
        res.json(allNotes);
      }
    });
  })
  .post((req, res) => {
    const info = JSON.parse(Object.keys(req.body)[0]);
    if (info.action === "add") {
      const newnote = new notes({
        title: info.note.title,
        content: info.note.content,
      });
      if (newnote.title && newnote.content) {
        newnote.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(info.action);
            notes.find({}, (error, notes) => {
              res.send(notes);
            });
          }
        });
      }
    }
    if (info.action === "delete") {
      notes
        .deleteOne({ title: info.note.title, content: info.note.content })
        .then(() => console.log("Note Deleted"));
      notes.find({}, (error, notes) => {
        res.send(notes);
      });
    }
    //   else{
    //      notes.find({},(error,notes)=>{
    //     res.send(notes);
    // }
    //    );
    //   }
  });
module.exports = router;
