const router = require('express').Router();
const StoryRouter = require('./Story');

router.use('/stories', StoryRouter);

module.exports = router;
