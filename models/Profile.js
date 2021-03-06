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
    job: {
        type: String,
        required: true
    },
    weekly_freq: {
        type: String,
        required: true
    },
    obs: {
        type: String
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
            fat_mass: {
                type: String,
                required: true
            },
            heart_rate: {
                type: String,
                required: true
            },
            blood_pressure: {
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