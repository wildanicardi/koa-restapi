const Joi = require("joi");
const {
  User,Post
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
exports.findByCredentials = async ({
  email,
  password
}) => {

  const user = await User.findOne({
    where: {
      email: email
    }
  });
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 400,
      message: "email is wrong"
    });
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 400,
      message: "Password is Wrong"
    });
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