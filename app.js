const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./utils/limiter');

const { PORT = 3000 } = process.env;
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(helmet()); // мидлвэр автоматически проставляет заголовки без-ти Content-Security-Policy
app.use(limiter); // мидлвэр ограничения количества запросов с одного IP

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
