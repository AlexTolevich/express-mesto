const router = require('express').Router();
const {
  createUser,
  getUser,
  getUsers,
  setUser,
  setAvatar,
} = require('../controllers/users');

router.post('/', createUser);

router.get('/:id', getUser);

router.get('/', getUsers);

router.patch('/me', setUser);

router.patch('/me/avatar', setAvatar);

module.exports = router;
