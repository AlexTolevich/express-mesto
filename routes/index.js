const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFound');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
