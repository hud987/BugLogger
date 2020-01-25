const router = require('express').Router();
let Ticket = require('../models/ticket.model');
ObjectId = require('mongodb').ObjectID;

//get all tickets
router.route('/').get((req, res) => {
    Ticket.find()
        .then(tickets => res.json(tickets))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get ticket with ticketId
router.route('/:id').get((req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get tickets in projectId
router.route('/inproject/:id').get((req, res) => {
    Ticket.find({project: req.params.id})
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get tickets assigned to a userId
router.route('/assignedto/:id').get((req, res) => {
    ObjectId = require('mongodb').ObjectID;
    Ticket.find({assignedToId: { $elemMatch: { $eq: ObjectId(req.params.id) }}})
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error: ' + err));
});



//create ticket
router.route('/add').post((req, res) => {
    ObjectId = require('mongodb').ObjectID;
    
    const description = req.body.description;
    const assignedToId = [ObjectId(req.body.assignedToId)];
    const assignedToUsername = req.body.assignedToUsername;
    const project = req.body.project;
    const projectTitle = req.body.projectTitle;
    const submiter = req.body.submiter;
    const status = "Open"
    const type = req.body.type;

    const newTicket = new Ticket({
        description,
        assignedToId,
        assignedToUsername,
        project,
        projectTitle,
        submiter,
        status,
        type});

    newTicket.save()
        .then(ret => res.json(ret))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update ticket at ticket Id
router.route('/update/:id').post((req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => {
            ticket.description = req.body.description;
            ticket.assignedToId = req.body.assignedToId;
            ticket.assignedToUsername = req.body.assignedToUsername;
            ticket.status = req.body.status;
            ticket.type = req.body.type;
            
            ticket.save()
                .then(() => res.json('Project updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//change assinedToUsername for ticket with ticketId
router.route('/updateassignment').post((req, res) => {
    Ticket.updateMany(
      { assignedToId: { $elemMatch: { $eq: ObjectId(req.body.id) }}},
      { $set: { assignedToUsername: req.body.username }})
      .then(() => res.json('change ticket assignment...'))
      .catch(err => res.status(400).json('Error: ' + err));
});


//delete ticket by id
router.route('/:id').delete((req, res) => {
    Ticket.findByIdAndDelete(req.params.id)
        .then(() => res.json('ticket deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete multiple tickets by ticketId
router.route('/deletemany/').post((req, res) => {
    Ticket.deleteMany({_id: {$in: req.body.tickets}})
        .then(() => res.json('All project tickets deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;