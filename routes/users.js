const router = require('express').Router();
const {
  getUser,
  getUsers,
  setUser,
  setAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.patch('/me/avatar', setAvatar);

router.patch('/me', setUser);

router.get('/me', getCurrentUser);

router.get('/:id', getUser);

router.get('/', getUsers);

module.exports = router;
