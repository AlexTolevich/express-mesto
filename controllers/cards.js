const Card = require('../models/card');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/errors');

const postCard = (req, res) => {
  const {
    name,
    link,
  } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    // вернём записанные в базу данные
    .then((card) => res.status(200).send(card))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

const delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: `Карточка с указанным id=${req.params.cardId} не найдена.` });
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: `Передан несуществующий _id=${req.params.cardId} карточки.` });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятия лайка.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: `Передан несуществующий _id=${req.params.cardId} карточки.` });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятия лайка.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  postCard,
  delCard,
  likeCard,
  dislikeCard,
};
