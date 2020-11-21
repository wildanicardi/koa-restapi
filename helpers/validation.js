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
exports.findByCredentials = async (ctx,{
  email,
  password
}) => {

  const user = await User.findOne({
    where: {
      email: email
    }
  });
  if (!user) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: "email is wrong"
    };
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: "Password is Wrong"
    };
  }
  return user;
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