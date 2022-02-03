const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: {
    type: String, // ссылка на аватар — это строка
    minlength: 11, // минимальная длина https://a.a
    required: true,
  },
  about: {
    type: String, // Описание — это строка
    required: true, // оно должно быть у каждого пользователя, так что описание — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
});

module.exports = mongoose.model('user', userSchema);
