const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/errors');

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    // вернём записанные в базу данные
    .then((user) => res.status(200).send(user))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: `Пользователь по указанному id=${req.params.id} не найден.` });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при запросе пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при запросе пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const setUser = (req, res) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: `Пользователь с указанным id=${req.user._id} не найден.` });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const setAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: `Пользователь с указанным id=${req.user._id} не найден.` });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  createUser,
  login,
  getUser,
  getUsers,
  getCurrentUser,
  setUser,
  setAvatar,
};
