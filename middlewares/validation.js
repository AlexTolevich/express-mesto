const { celebrate, Joi } = require('celebrate');

const linkRegExp = /^(https?:\/\/)?(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?$/;

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(linkRegExp),
    about: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegExp),
  }),
});

const validationPatchUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

const validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegExp),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validationLogin,
  validationUser,
  validationAvatar,
  validationPatchUser,
  validationUserId,
  validationCard,
  validationCardId,
};
