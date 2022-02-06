const router = require('express').Router();
const {
  getCards,
  postCard,
  delCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', postCard);

router.delete('/:cardId', delCard);

module.exports = router;
