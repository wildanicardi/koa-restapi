const {User,Post, Comentar,ReplyComentar} = require('../models');
const {comentarValidation,replyValidation} = require('../helpers/validation');
const { StatusCodes } =require('http-status-codes');
const {sendEmailNotification} = require('../helpers/mailService');
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
    const user = await User.findOne({
      where:{
        id:userId
      }
    });
    const post = await Post.findOne({
      where:{
        id:idPost
      },
      include:["user"]
    });
    const text = `Your posts are commented on by ${user.username}`;
    await sendEmailNotification(post.user.email,post.user.username,text);
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      status:"created success",
      data:data
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = {
      message: error.message,
    };
  }
}
exports.replyComentar = async(ctx) => {
  const {reply} = ctx.request.body;
  const {idComentar} = ctx.request.params;
  const userId = ctx.request.user.id;
  const {error} = replyValidation({reply});
  if (error){
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: `Kesalahan dalam validasi ${error}`,
    };
  }
  try {
    const data = await ReplyComentar.create({
      reply,userId:userId,comentarId:idComentar
    });
    const user = await User.findOne({
      where:{
        id:userId
      }
    });
    const comentar = await Comentar.findOne({
      where:{
        id:idComentar
      },
      include:["user"]
    })
    const text = `Your commentar are replied on by ${user.username}`;
    await sendEmailNotification(comentar.user.email,comentar.user.username,text)
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      status:"created success",
      data:data
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = {
      message: error.message,
    };
  }

}