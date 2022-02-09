const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const bodyParser = require('body-parser');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { NOT_FOUND } = require('./utils/errors');

const app = express();
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port работает ${PORT}`);
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use((req, res, next) => {
  req.user = {
    _id: '62000b03ebeadd288ab6f907',
  };
  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не существует' });
});
