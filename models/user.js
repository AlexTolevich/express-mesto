const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
  avatar: {
    type: String, // ссылка на аватар — это строка
    minlength: 11, // минимальная длина https://a.a
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: 'Введенные данные не являются ссылкой',
    },
  },
  about: {
    type: String, // Описание — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Исследователь',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (Email) => validator.isEmail(Email),
      message: 'Ошибка формата адреса почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
