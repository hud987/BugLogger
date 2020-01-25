const router = require('express').Router();
let User = require('../models/user.model');
ObjectId = require('mongodb').ObjectID;

//gets all users, useful for debuging
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//finds all users with ObjectId in list
router.route('/searchid').get((req, res) => {
    User.find({ _id: {$in: req.query.ids}})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//gets a specific user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

//finds all users with ProjectId
router.route('/inproject/:id').get((req, res) => {
    ObjectId = require('mongodb').ObjectID;
    console.log('in id searching...')

    User.find({ projects: { $elemMatch: { $eq: ObjectId(req.params.id) }}})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//finds all users without ProjectId
router.route('/notinproject/:id').get((req, res) => {
    ObjectId = require('mongodb').ObjectID;
    console.log('not in id searching...')

    User.find({ projects: { $not: { $elemMatch: { $eq: ObjectId(req.params.id) }}}})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});



//adds a user
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    const projects = req.body.projects;

    const newUser = new User({username,email,role,projects});
    
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update a user with userId
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.role = req.body.role;
                
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


//adds a project Id to all userIds in input array
router.route('/updateprojects').post((req, res) => {
    //updateMany(<filter>,<update>,)
    User.updateMany(
        {_id: {$in: req.body.users}},
        {$push: {projects: req.body.id}})
        .then(() => console.log('User added to project!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
});

//removes a project Id to all userIds in input array
router.route('/removeproject/').post((req, res) => {
    User.updateMany(
        {_id: {$in: req.body.users}},
        {$pull: {projects: req.body.id}})
        .then(() => res.json('Project removed from User!'))
        .catch(err => res.status(400).json('Error: ' + err));
  });
            
//changes the role of all userIds in input array
router.route('/updateroles').post((req, res) => {
    //console.log(req.body)
    //updateMany(<filter>,<update>,)
    User.updateMany(
        {_id: {$in: req.body.users}},
        {$set: {role: req.body.role}})
        .then(() => console.log('User role changed!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
});



//deletes a specific user by id
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;