const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./utils/limiter');

const { PORT = 3000 } = process.env;
// const { NOT_FOUND } = require('./utils/errors');
const errorHandler = require('./middlewares/error-handler');
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
const routes = require('./routes');

const app = express();
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(helmet()); // мидлвэр автоматически проставляет заголовки без-ти Content-Security-Policy
app.use(limiter); // мидлвэр ограничения количества запросов с одного IP

// app.use((req, res) => {
//   res.status(NOT_FOUND).send({ message: 'Ресурс не существует' });
// });


app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
