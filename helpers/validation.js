const Joi = require("joi");
const {
  User
} = require("../models");
const {
  StatusCodes
} =require('http-status-codes');

const bcrypt = require("bcryptjs");
exports.registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(6)
      .required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().required()
  });
  return schema.validate(data);
}
//validation login
exports.loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};
exports.postValidation = data => {
  const schema = Joi.object({
    description: Joi.string().min(8).required(),
    title: Joi.string().required()
  });
  return schema.validate(data);
}
exports.comentarValidation = data => {
  const schema = Joi.object({
    comentar: Joi.string().required()
  });
  return schema.validate(data);
}
exports.replyValidation = data => {
  const schema = Joi.object({
    reply: Joi.string().required()
  });
  return schema.validate(data);
}