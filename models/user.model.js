const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
    },
    email: {
        type: String,
    },
    role: {
      type: String,
    },
    projects: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
        //type: [{ type: String}],
        sparse: true
    },/*
    tickets: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Ticket'}],
        sparse: true
    },*/
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;