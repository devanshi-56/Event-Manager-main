const mongoose = require('mongoose');
// Share event code here
const EventSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    participants: {
        type: Number,
        required: false
    },
    imageURL: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Number,
        required: true
    },
    expire_at: {
        type: Date, 
        default:Date.now, 
        expires: 600
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    interestedParticipants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Event', EventSchema);