const router = require('express').Router();
const {
  getUser,
  getUsers,
  setUser,
  setAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/:id', getUser);

router.get('/', getUsers);

router.patch('/me', setUser);

router.get('/me', getCurrentUser);

router.patch('/me/avatar', setAvatar);

module.exports = router;
