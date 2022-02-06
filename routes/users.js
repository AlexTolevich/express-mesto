const router = require('express').Router();
const {
  createUser,
  getUser,
  getUsers,
} = require('../controllers/users');

router.post('/', createUser);

router.get('/:id', getUser);

router.get('/', getUsers);

module.exports = router;
