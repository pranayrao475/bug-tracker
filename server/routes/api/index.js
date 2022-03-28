const router = require('express').Router();
const userRoutes = require('./user-routes');
const bugRoutes = require('./bug-routes');

router.use('/user', userRoutes);
router.use('/bug', bugRoutes);

module.exports = router;