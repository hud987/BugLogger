const express = require('express');
const router = express.Router();

//Project Model
let Project = require('../../models/project.model');

//ObjectId function to convert string to object id
ObjectId = require('mongodb').ObjectID;

//get all projects
router.get('/', (req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get project by projectId
router.get('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get all projects contianing given userId
router.get('/inproject/:id', (req, res) => {
  Project.find({ users: { $elemMatch: { $eq: ObjectId(req.params.id) }}})
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gets all users in a project with projectId
router.get('/getusers/:id', (req, res) => {
  Project.findById(req.params.id)
  .then(project => res.json(project.users))
  .catch(err => res.status(400).json('Error: ' + err));
});



//add project, needs title, description, and users
//projects start wiht 0 tickets
router.post('/add', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const users = req.body.users;
  const tickets = [];

  const newProject = new Project({
    title,
    description,
    users,
    tickets,
  });
  
  newProject.save()
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update project by projectId
router.post('/update/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.title = req.body.title;
      project.description = req.body.description;
      project.users = req.body.users;
      project.tickets = req.body.tickets;
      
      project.save()
        .then(() => res.json('Project updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//remove a specific ticket from project with projectId
router.post('/removeticket/:id', (req, res) => {
  Project.updateOne(
    {_id: ObjectId(req.params.id)},
    {$pull: {tickets: req.body.ticket}})
      .then(() => res.json('Ticket removed to project'))
      .catch(err => res.status(400).json('Error: ' + err));
});

//add ticketId to projects with projectId
router.post('/addticket/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.tickets.push(req.body._id)
      project.save()
        .then(() => res.json('Ticket add to project'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//add users from project with projecId
router.post('/addusers/:id', (req, res) => {
  Project.updateOne(
    {_id: req.body.id},
    {$push: {users: req.body.usersToAdd}})
    .then(() => res.json('removed users...'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//remove users from project with projectId
router.post('/removeusers/:id', (req, res) => {
  Project.updateOne(
    {_id: req.body.id},
    {$pullAll: {users: req.body.usersToRemove}})
    .then(() => res.json('removed users...'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//remove users with userId from any project
router.post('/removeoneuser/:id', (req, res) => {
  Project.updateMany(
    {users: { $elemMatch: { $eq: ObjectId(req.params.id) }}},
    {$pull: {users: ObjectId(req.params.id) }})
    .then(() => console.log('User removed from project...'))
    .catch(err => res.status(400).json('Error: ' + err));
});



//find and delete project with projectId
router.delete('/:id', (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;