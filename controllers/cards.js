const Card = require('../models/card');
const BadRequest = require('../errors/badRequest');
const NotFoundError = require('../errors/notFound');
const ForbiddenError = require('../errors/forbidden');

const postCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const delCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError(`Карточка с указанным id=${req.params.cardId} не найдена.`);
    })
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            res.status(200).send(card);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Отсутствуют права на удаление карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Передан несуществующий _id=${req.params.cardId} карточки.`);
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки/снятия лайка.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Передан несуществующий _id=${req.params.cardId} карточки.`);
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки/снятия лайка.'));
      } else {
        next(err);
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
