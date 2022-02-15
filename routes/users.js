const router = require('express').Router();
const {
  getUser,
  getUsers,
  setUser,
  setAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validationAvatar,
  validationPatchUser,
  validationUserId,
} = require('../middlewares/validation');

router.patch('/me/avatar', validationAvatar, setAvatar);

router.patch('/me', validationPatchUser, setUser);

router.get('/me', getCurrentUser);

router.get('/:id', validationUserId, getUser);

router.get('/', getUsers);

module.exports = router;
