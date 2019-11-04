const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        name: String
    },
    plan_type: {
        type: String,
        required: true
    },
    date_started: {
        type: Date,
        required: true
    },
    is_current: {
        type: Boolean,
        required: true,
        default: true
    },
    date_ended: {
        type: Date
    },
    obs: {
        type: String
    },
    plan_evolutions: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            initial_weight: {
                type: String,
                required: true
            },
            current_weight: {
                type: String
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
                default: true
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

module.exports = Post = mongoose.model('plan', PlanSchema);