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
    password: Joi.string().min(8).required()
  });
  return schema.validate(data);
}
//validation login
exports.loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(6)
      .required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};
exports.findByCredentials = async ({
  username,
  password
}) => {

  const user = await User.findOne({
    where: {
      username: username
    }
  });
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 400,
      message: "username salah"
    });
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 400,
      message: "Password salah"
    });
  }
  return user;
};