const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  assignedToId: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    //type: String,
  },
  assignedToUsername: {
    type: String,
  },
  project: {
    //type: { type: Schema.Types.ObjectId, ref: 'Project' },
    type: String,
  },
  projectTitle: {
    //type: { type: Schema.Types.ObjectId, ref: 'Project' },
    type: String,
  },/*
  submiter: {
    //type: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String,
  },
  priority: {
    type: String,
  },*/
  status: {
    type: String,
  },
  type: {
    type: String,
  },
}, {
  timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;