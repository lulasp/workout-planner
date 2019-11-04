const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  plan_type: {
    type: Schema.Types.ObjectId,
    ref: "plan"
  },
  exercise: {
    type: String,
    required: true
  },
  muscle_group: {
    type: String,
    required: true
  },
  is_machine: {
    type: Boolean
  },
  machine_name: {
    type: String
  },
  is_bench: {
    type: Boolean
  },
  bench: {
    type: String
  },
  bar_type: {
    type: String
  },
  series: {
    type: String,
    required: true
  },
  evolutions: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      initial_weight: {
        type: String,
        required: true
      },
      current_weight: {
        type: String,
        required: true
      },
      min_rep: {
        type: String,
        required: true
      },
      max_rep: {
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

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);
