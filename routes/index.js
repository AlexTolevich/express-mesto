const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use((req, res, next) => {
  next((res.status(404).send({ message: 'Ресурс не существует' })));
});

module.exports = router;
