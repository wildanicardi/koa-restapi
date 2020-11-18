const {
  User
} = require("../models");
const {
  registerValidation,
  loginValidation,
  findByCredentials,
} = require("../helper/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  StatusCodes
} =require('http-status-codes');

exports.registerUser = async(req,res) => {
  const {
    username,
    password
  } = req.body;
  const {
    error
  } = registerValidation({
    username,
    password
  });
  if (error){
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    },StatusCodes.BAD_REQUEST);
  }
  const usernameExist = await User.findOne({
    where: {
      username: username,
    },
  });
  if (usernameExist){
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "Username sudah ada",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const result = await User.create({
      nama,
      username,
      telepon,
      password: hashPassword,
    });
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      status: "success",
      "message":"berhasil terdaftar"
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
}
exports.login  = async (req,res) => {
  const {
    username,
    password
  } = req.body;
  const {
    error
  } = loginValidation({
    username,
    password,
  });
  if (error){
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 400,
      message: error.message,
    });
  }
  try {
    const user = await findByCredentials({
      username,
      password,
    });
    const token = jwt.sign({
        id: user.id,
      },
      process.env.TOKEN_SECRET
    );
    const id = await setUserId(user.id)
    const data = {
      id : id,
      nama : user.nama,
      username : user.username,
      token:token
    }
    res.status(StatusCodes.OK).json({
      code: 200,
      satus:"success",
      data: data,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 400,
      message: error.message,
    });
  }
}