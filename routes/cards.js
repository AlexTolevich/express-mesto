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
  validationCardrId,
} = require('../middlewares/validation');

router.get('/', getCards);

router.post('/', validationCard, postCard);

router.put('/:cardId/likes', validationCardrId, likeCard);

router.delete('/:cardId/likes', validationCardrId, dislikeCard);

router.delete('/:cardId', validationCardrId, delCard);

module.exports = router;
