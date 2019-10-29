const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    objective: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    body_state: [
        {
            height: {
                type: String,
                required: true
            },
            weight: {
                type: String,
                required: true
            },
            age: {
                type: String,
                required: true
            },
            muscle_mass: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);