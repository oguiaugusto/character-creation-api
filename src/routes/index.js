const router = require('express').Router();
const StoryRouter = require('./Story');
const CharacterRouter = require('./Character');

router.use('/stories', StoryRouter);
router.use('/characters', CharacterRouter);

module.exports = router;
