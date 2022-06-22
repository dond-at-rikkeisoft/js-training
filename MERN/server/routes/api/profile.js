const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();

// @route  GET api/profile
// @des get profile
// @access private

router.get('/me', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );
  console.log(profile);
  if (!profile)
    return res.status(400).json({
      msg: 'There is not profile for user',
    });

  res.send(profile);
});

// @route  POST api/profile
// @des create profile
// @access private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required').not().isEmpty(),
      check('skills', 'skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = req.body;

    //built profile object
    const profileField = {};

    profileField.user = req.user.id;
    if (company) profileField.company = company;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (bio) profileField.bio = bio;
    if (status) profileField.status = status;
    if (githubusername) profileField.githubusername = githubusername;
    if (skills) {
      profileField.skills = skills.split(',').map((skill) => skill.trim());
    }

    // built social object

    profileField.social = {};
    if (youtube) profileField.social.youtube = youtube;
    if (facebook) profileField.social.facebook = facebook;
    if (twitter) profileField.social.twitter = twitter;
    if (linkedin) profileField.social.linkedin = linkedin;
    if (instagram) profileField.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );

        return res.json(profile);
      }

      //create
      profile = new Profile(profileField);
      profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
    }
  }
);

// @route  GET api/profile
// @des Get all profile
// @access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email']);
    res.status(200).json({
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

// @route  GET api/profile
// @des Get profile by id
// @access Public
router.get('/user/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' });
    res.status(500).json('Server error');
  }
});

// @route  Delete api/profile
// @des delete profile by id
// @access private
router.delete('/user/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.params.id });
    if (!profile) {
      return res.status(400).json("Don't  delete profile for user!");
    }
    const user = await User.findOneAndDelete({ id: req.params.id });
    console.log(user);
    if (!user) {
      return res.status(400).json("Don't  delete user!");
    }

    res.status(200).json('Delete profile successfully!');
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: "Don't  delete profile for user!" });
    res.status(500).json('Server error');
  }
});

// @route  PUT api/experience
// @des add profile experience
// @access private

router.put(
  '/experience',
  [
    auth,
    [check('title', 'title is required').not().isEmpty()],
    [check('company', 'company is required').not().isEmpty()],
    [check('from', 'from date is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, decripttion } =
      req.body;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      decripttion,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.send('Profile not found');
      }

      profile.experience.push(newExperience);
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profile },
        { new: true }
      );

      res.json({
        msg: 'add experience sucessfullfy',
        profile,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
    }
  }
);

// @route  DELETE api/experience
// @des delete experience from profile
// @access private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const expId = req.params.exp_id;
    profile.experience = profile.experience.filter((exp) => exp.id !== expId);

    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profile },
      { new: true }
    );

    res.json({ profile });
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: "Don't delete exp from profile!" });
    res.status(500).json('Server error');
  }
});

// @route  PUT api/profile/education
// @des add education from profile
// @access private

router.put(
  '/education/',
  [
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, decripttion } =
      req.body;
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      decripttion,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.education.push(newEducation);

      await profile.save();
      res.json({ profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
    }
  }
);

// @route  DELETE api/profile/education
// @des add education from profile
// @access private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const eduId = req.params.edu_id;
    profile.education = profile.education.filter((edu) => edu.id !== eduId);
    await profile.save();
    console.log(profile.education);
    res.json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

// @route  GET api/proflie/github/:username
// @des register user
// @access Public

//lesson 23

module.exports = router;
