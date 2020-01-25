const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    tickets: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
        sparse: true
    },
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: true,
        sparse: true
    },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;