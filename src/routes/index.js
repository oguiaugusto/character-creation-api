const router = require('express').Router();
const StoryRouter = require('./Story');
const CharacterRouter = require('./Character');
const UserRouter = require('./User');

router.use('/stories', StoryRouter);
router.use('/characters', CharacterRouter);
router.use('/users', UserRouter);

module.exports = router;
