const router = require('express').Router();

//require CRUD functions from controller here
  const {
    getAllBugs,
    createBug,
    getBug,
    updateBug,
    removeBug,
  } = require('../../controllers/bug-controller');
//const { withAuth } = require('../../utils/auth');

//use express router to get, post, put, delete here
  router.route('/').get(getAllBugs);
  router.route('/').post(createBug);
  router.route('/:id').get(getBug);
  router.route('/:id').put(updateBug);
  router.route('/:id').delete(removeBug);

module.exports = router;