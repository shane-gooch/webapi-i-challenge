// implement your API here

const express = require("express");
const cors = require("cors");
const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.use(cors());

//Get all users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

//Get specific user
server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  Users.findById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The users with the spefied ID does not exist" });
    });
});

//Post
server.post("/api/users", (req, res) => {
  const usersInfo = req.body;
  if (!usersInfo.name || !usersInfo.bio) {
    return res
      .status(400)
      .json({ message: "Provide provide a name and bio for the user" });
  }
  Users.insert(usersInfo)
    .then(ids => {
      console.log(ids);
      Users.findById(ids.id).then(user => {
        if (user) {
          console.log(user);
          res.status(201).json(user);
        } else {
          res.status(500).json({
            message: "There was an error the user to the database"
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error saving the user to the database"
      });
    });
});

//Delete
server.delete("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  Users.remove(userID)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

//Put
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then(updateUser => {
      if (!updateUser) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
      if (!changes.name || !changes.bio) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user" });
      }
      if (updateUser) {
        return res.status(200).json(updateUser);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified" });
    });
});

const port = 8000;
server.listen(port, () => console.log("api running"));
