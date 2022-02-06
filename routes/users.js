const router = require('express').Router();
const User = require('../models/user');

router.post('/', (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    // вернём записанные в базу данные
    .then((user) => res.send({data: user}))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
});

router.get('/', (req, res) => {
  User.find(req.params.id)
    .then((user) => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
});

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
module.exports = router;
