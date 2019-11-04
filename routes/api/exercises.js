const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Plan = require('../../models/Plan');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Exercise = require('../../models/Exercise');

//@route    POST api/exercises/plan_id
//@desc     Create a exercise for a plan
//@access   Private
router.post(
    '/:id',
    [
        auth,
        [
            check('exercise', 'Exercise is required')
                .not()
                .isEmpty(),
            check('muscle_group', 'muscle group is required')
                .not()
                .isEmpty(),
            check('series', 'Series is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
           // const user = await User.findById(req.user.id).select('-password');
          //  const plan = await Plan.findById(req.params.id);

            const newExercise = new Exercise ({
                plan_type: req.params.id,
                exercise: req.body.exercise,
                muscle_group: req.body.muscle_group,
                is_machine: req.body.is_machine,
                machine_name: req.body.machine_name,
                is_bench: req.body.is_bench,
                bench: req.body.bench,
                bar_type: req.body.bar_type,
                series: req.body.series,
                user: req.user.id,

            });

            const exercise = await newExercise.save();

            res.json(exercise);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    }
);

//@route    GET api/exercises
//@desc     Get all exercises
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const exercises = await Exercise.find().sort({ date: -1 });
        res.json(exercises);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/exercises/:id
//@desc     Get exercise by ID
//@access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ msg: 'Exercise not found' });
        }

        res.json(exercise);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Exercise not found' });
        }
        res.status(500).send('Server Error');
    }
});

//@route    GET api/exercises/all/:plan_type 
//@desc     Get exercise by plan type
//@access   Private
router.get('/all/:plan_type', auth, async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        console.log(plan);
        if (!plan) {
            return res.status(404).json({ msg: 'Exercises for plan not found' });
        }

        res.json(plan);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Exercises for plan not found' });
        }
        res.status(500).send('Server Error');
    }
});

//@route    DELETE api/exercise/:id
//@desc     Delete an exercise
//@access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ msg: 'Exercise not found' });
        }

        //check user
        if (exercise.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await exercise.remove();


        res.json({ msg: 'Exercise removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Exercise not found' });
        }
        res.status(500).send('Server Error');
    }
});


//@route    POST api/exercise/evolution/:id
//@desc     Create evolution for an exercise
//@access   Private
router.post(
    '/evolution/:id',
    [
        auth,
        [
            check('initial_weight', 'Initial Weight is required')
                .not()
                .isEmpty(),
            check('current_weight', 'Current Weight is required')
                .not()
                .isEmpty(),
            check('min_rep', 'Min rep is required')
                .not()
                .isEmpty(),
            check('max_rep', 'Max rep is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
            check('description', 'Description is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const exercise = await Exercise.findById(req.params.id);

            const newEvolution = {
                initial_weight: req.body.initial_weight,
                current_weight: req.body.current_weight,
                min_rep: req.body.min_rep,
                max_rep: req.body.max_rep,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
                user: req.user.id
            };

            plan.plan_evolutions.unshift(newEvolution);

            await plan.save();

            res.json(plan.plan_evolutions);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    }
);

/*router.put(
    '/evolution/:id',
    [
        auth,
        [
            check('initial_weight', 'Initial Weight is required')
                .not()
                .isEmpty(),
            check('current_weight', 'Current Weight is required')
                .not()
                .isEmpty(),
            check('min_rep', 'Min rep is required')
                .not()
                .isEmpty(),
            check('max_rep', 'Max rep is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
            check('description', 'Description is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            initial_weight,
            current_weight,
            min_rep,
            max_rep,
            from,
            to,
            current,
            description
        } = req.body;

        const newEvo = {
            initial_weight,
            current_weight,
            min_rep,
            max_rep,
            from,
            to,
            current,
            description
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const plan = await Plan.findById(req.params.id);

            const newEvolution = {
                initial_weight: req.body.initial_weight,
                current_weight: req.body.current_weight,
                min_rep: req.body.min_rep,
                max_rep: req.body.max_rep,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
                user: req.user.id
            };
            console.log(newEvolution);
            plan.evolutions.unshift(newEvolution);

            await plan.save();

            res.json(plan.evolutions);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    });*/


//@route    DELETE api/plans/evolution/:id/:evolution_id
//@desc     Delete evolution 
//@access   Private
/*router.delete('/evolution/:id/:evolution_id', auth, async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        //pull out evolution to delete
        const evolution = plan.evolutions.find(evolution => evolution.id === req.params.evolution_id);

        //make sure evolution exists
        if (!evolution) {
            return res.status(404).json({ msg: 'Evolution does not exist' });
        }

        //user that deletes evolution is user that made evolution
        if (plan.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        //get remove index
        const removeIndex = plan.evolutions
            .map(evolution => evolution.user.toString())
            .indexOf(req.user.id);

        plan.evolutions.splice(removeIndex, 1);

        await plan.save();

        res.json(plan.evolutions);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});*/

router.delete('/evolution/:id/:evolution_id', auth, async (req, res) => {
    try {
        const foundPlan = await Plan.findById(req.params.id);
        const evoIds = foundPlan.evolutions.map(evo => evo._id.toString());

        const removeIndex = evoIds.indexOf(req.params.evolution_id);
        if (removeIndex === -1) {
            return res.status(500).json({ msg: "Server error" });
        } else {
            // theses console logs helped me figure it out
            /* console.log("expIds", expIds);
             console.log("typeof expIds", typeof expIds);
             console.log("req.params", req.params);
             console.log("removed", expIds.indexOf(req.params.state_id)); */
            foundPlan.evolutions.splice(removeIndex, 1);
            await foundPlan.save();
            return res.status(200).json(foundPlan);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});


module.exports = router;