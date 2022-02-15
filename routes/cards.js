const router = require('express').Router();
const {
  getCards,
  postCard,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', postCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

router.delete('/:cardId', delCard);

module.exports = router;
