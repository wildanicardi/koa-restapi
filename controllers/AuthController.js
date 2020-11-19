const {
  User,
  VerificationToken
} = require("../models");
const {
  registerValidation,
  loginValidation,
  findByCredentials,
} = require("../helpers/validation");
const {mailService} = require('../helpers/mailService');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  StatusCodes
} =require('http-status-codes');
const secret =  process.env.TOKEN_SECRET || "secret"

exports.registerUser = async(ctx) => {
  const {
    username,
    email,
    password
  } = ctx.request.body;
  const {
    error
  } = registerValidation({
    email,
    username,
    password
  });
  if (error){
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
        message: error.message,
    };
  }
  const emailExist = await User.findOne({
    where: {
      email: email,
    },
  });
  if (emailExist){
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: "Email already",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const token = salt.toString("hex");

  try {
    const user = await User.create({
      email,
      username,
      password: hashPassword,
      isVerified:false
    });
    const verification = await VerificationToken.create({
      userId:user.id,
      token:token
    });
   await mailService(email,username,token);
   ctx.status = StatusCodes.OK;
   return ctx.body = {
      status: "success",
      "message":"Register Success"
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }
}
exports.login  = async (ctx) => {
  const {
    email,
    password
  } = ctx.request.body;
  const {
    error
  } = loginValidation({
    email,
    password,
  });
  if (error){
    ctx.status= StatusCodes.BAD_REQUEST;
    ctx.body = {
      message: error.message,
    };
  }
  try {
    const user = await findByCredentials({
      email,
      password,
    });
    if(!user.isVerified){
      ctx.status= StatusCodes.BAD_REQUEST;
      return ctx.body = {
        "message":"User is not Verification"
      };
    }
    const token = jwt.sign({
        id: user.id,
      },
      secret
    );
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      status: "success",
      "message":"Login Success",
      token:token
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    } ;
  }
}
exports.verifyEmail = async(ctx) => {
  const {email,token} = ctx.request.query;
  const user = await User.findOne({
    where:{email:email}
  });
  if(user.isVerified){
    ctx.status = 202;
    return ctx.body ={
      message:"Email Already Verified"
    }
  }
  try {
    const verifyToken = await VerificationToken.findOne({
      where:{token:token}
    });
    if(verifyToken){
      await User.update({
        isVerified:true
      },{
        where:{
        id:user.id
      }
      });
    }
    ctx.status = 200;
    return ctx.body = {
      message:"Verification Success"
    }
  } catch (error) {
    ctx.status = 404;
    return ctx.body = {
      message:error.message
    }
  }
}