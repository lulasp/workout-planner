const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Plan = require("../../models/Plan");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route    POST api/plans
//@desc     Create a plan
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("plan_type", "Plan is required")
        .not()
        .isEmpty(),
      check("date_started", "Date Started is required")
        .not()
        .isEmpty(),
      check("is_current", "Is current is required")
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
      const user = await User.findById(req.user.id).select("-password");

      const newPlan = new Plan({
        name: user.name,
        plan_type: req.body.plan_type,
        date_started: req.body.date_started,
        is_current: req.body.is_current,
        date_ended: req.body.date_ended,
        obs: req.body.obs,
        user: req.user.id
      });

      const plan = await newPlan.save();

      res.json(plan);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/plans
//@desc     Get all plans
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const plans = await Plan.find().sort({ date: -1 });
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/plans/:id
//@desc     Get plan by ID
//@access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    res.json(plan);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Plan not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    GET api/user_plans/me
//@desc     Get current user plan
//@access   Private
router.get("/user_plans/me", auth, async (req, res) => {
  try {
    const plan = await Plan.find({ user: req.user.id }).populate("user", [
      "name"
    ]);

    if (!plan) {
      return res.status(400).json({ msg: "There is no plans for this user." });
    }

    //res.json(profile);
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Plan for this user not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/plan/:id
//@desc     Delete a plan
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    //check user
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await plan.remove();

    res.json({ msg: "Plan removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Plan not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    POST api/plans/plan_evolutions/:id
//@desc     Create evolution for a plan
//@access   Private
router.post(
  "/plan_evolution/:id",
  [
    auth,
    [
      check("initial_weight", "Initial Weight is required")
        .not()
        .isEmpty(),
      check("current_weight", "Current Weight is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty(),
      check("description", "Description is required")
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
      const user = await User.findById(req.user.id).select("-password");
      const plan = await Plan.findById(req.params.id);

      const newPlanEvolution = {
        initial_weight: req.body.initial_weight,
        current_weight: req.body.current_weight,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
        user: req.user.id
      };

      plan.plan_evolutions.unshift(newPlanEvolution);

      await plan.save();

      res.json(plan.plan_evolutions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
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

router.delete("/plan_evolution/:id/:evolution_id", auth, async (req, res) => {
  try {
    const foundPlan = await Plan.findById(req.params.id);
    const evoIds = foundPlan.plan_evolutions.map(evo => evo._id.toString());

    const removeIndex = evoIds.indexOf(req.params.evolution_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      // theses console logs helped me figure it out
      /* console.log("expIds", expIds);
             console.log("typeof expIds", typeof expIds);
             console.log("req.params", req.params);
             console.log("removed", expIds.indexOf(req.params.state_id)); */
      foundPlan.plan_evolutions.splice(removeIndex, 1);
      await foundPlan.save();
      return res.status(200).json(foundPlan);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
