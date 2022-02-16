const router = require('express').Router();
const {
  getCards,
  postCard,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validationCard,
  validationCardId,
} = require('../middlewares/validation');

router.get('/', getCards);

router.post('/', validationCard, postCard);

router.put('/:cardId/likes', validationCardId, likeCard);

router.delete('/:cardId/likes', validationCardId, dislikeCard);

router.delete('/:cardId', validationCardId, delCard);

module.exports = router;
