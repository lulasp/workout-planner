const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private
router.post(
    '/',
    [
        auth,
        [
            check('objective', 'Objective is required')
                .not()
                .isEmpty(),
            check('sex', 'Sex is required')
                .not()
                .isEmpty(),
            check('job', 'Job is required')
                .not()
                .isEmpty(),
            check('weekly_freq', 'weekly frequency is required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            objective,
            sex,
            job,
            weekly_freq,
            obs
        } = req.body;

        //BUILD PROFILE OBJECT
        const profileFields = {};
        profileFields.user = req.user.id;
        if (objective) profileFields.objective = objective;
        if (sex) profileFields.sex = sex;
        if (job) profileFields.job = job;
        if (weekly_freq) profileFields.weekly_freq = weekly_freq;
        if (obs) profileFields.obs = obs;


        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //update user profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            //Create user profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

//@route    DELETE api/profile
//@desc     Delete profile, user and workoutplans
//@access   Private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove users posts

        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    PUT api/profile/body_state
//@desc     Add a body state to profile
//@access   Private
router.put(
    '/body_state',
    [
        auth,
        [
            check('height', 'Height is required')
                .not()
                .isEmpty(),
            check('weight', 'Weight is required')
                .not()
                .isEmpty(),
            check('age', 'Age is required')
                .not()
                .isEmpty(),
            check('muscle_mass', 'Muscle mass is required')
                .not()
                .isEmpty(),
            check('fat_mass', 'Fat mass is required')
                .not()
                .isEmpty(),
            check('heart_rate', 'Heart rate is required')
                .not()
                .isEmpty(),
            check('blood_pressure', 'Blood pressure is required')
                .not()
                .isEmpty(),
            check('description', 'Description is required')
                .not()
                .isEmpty(),
            check('from', 'From Date is required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            height,
            weight,
            age,
            muscle_mass,
            fat_mass,
            heart_rate,
            blood_pressure,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            height,
            weight,
            age,
            muscle_mass,
            fat_mass,
            heart_rate,
            blood_pressure,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.body_state.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    });

//@route    DELETE api/profile/body_state/:state_id
//@desc     Delete body_state from profile
//@access   Private
router.delete('/body_state/:state_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
        const bsIds = foundProfile.body_state.map(bs => bs._id.toString());

        const removeIndex = bsIds.indexOf(req.params.state_id);
        if (removeIndex === -1) {
            return res.status(500).json({ msg: "Server error" });
        } else {
            // theses console logs helped me figure it out
            /* console.log("expIds", expIds);
             console.log("typeof expIds", typeof expIds);
             console.log("req.params", req.params);
             console.log("removed", expIds.indexOf(req.params.state_id)); */
            foundProfile.body_state.splice(removeIndex, 1);
            await foundProfile.save();
            return res.status(200).json(foundProfile);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

//@route    GET api/profile/me/bodystate/:bodystate_id
//@desc     Get current users bodystate by id
//@access   Private
router.get('/me/bodystate/:bodystate_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;