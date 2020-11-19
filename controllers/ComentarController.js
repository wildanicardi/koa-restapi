const {Comentar} = require('../models');
const {comentarValidation} = require('../helpers/validation');
const { StatusCodes } =require('http-status-codes');

exports.createComentar = async (ctx) => {
  const {comentar} = ctx.request.body;
  const {idPost} = ctx.request.params;
  const userId = ctx.request.user.id;
  const {error} = comentarValidation({comentar});
  if (error){
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: `Kesalahan dalam validasi ${error}`,
    };
  }
  try {
    const data = await Comentar.create({
      comentar,userId:userId,postId:idPost
    });
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      status:"created success"
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = {
      status: 400,
      message: error.message,
    };
  }
}