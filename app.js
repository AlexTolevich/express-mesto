const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./utils/limiter');

const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { NOT_FOUND } = require('./utils/errors');

const app = express();
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use((req, res, next) => {
  req.user = {
    _id: '62000b03ebeadd288ab6f907',
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(helmet()); // мидлвэр автоматически проставляет заголовки без-ти Content-Security-Policy

app.use(limiter); // мидлвэр ограничения количества запросов с одного IP

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не существует' });
});

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
