const express = require('express');
const Router = express.Router();
const User = require('../models/usersModel');

Router.post('/signup-user', (req, res) =>{
    const {user} = req.body;
    User.create(user)
    .then(cUser =>{
        res.json({msg: "user created", user: cUser});
    }).catch(err => res.json(err).status(500));
});

Router.get("/all-users", (req,res) =>{
    User.find().then(users => res.json({users: users})).catch(err => res.json(err).status(500));
});

Router.post("/authenticate-user", (req, res) =>{
    const {user} = req.body;
    User.findOne({email: user.email, password: user.password})
    .then(rUser =>{
      
        if(rUser){
            res.json({msg: "user authenticated", user: rUser});
        }else{
            res.json({msg: "invalid email or password", user: null});
        }
    }).catch(err => res.json({error: err}).status(500));
});

Router.post("/update-bio", (req, res) =>{
    const {_id, bio} = req.body;
    User.findById(_id).then(user =>{
        user.bio = bio;
        user.save().then(result => {
            res.json({user: result});
        }).catch(err => res.json(err).status(500))
    }).catch(err => res.json(err).status(500));
});


Router.delete("/delete-user/:id", (req, res) => {
    User.findByIdAndRemove({ _id: req.params.id })
        .then(dUser => {
            res.json(dUser)
        }).catch(err => res.json(err).status(500));
});

module.exports = Router;