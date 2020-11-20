const {User,Post,Like} = require('../models');
const { StatusCodes } =require('http-status-codes');
const {sendEmailNotification} = require('../helpers/mailService');

exports.likePost = async (ctx) => {
  const {idPost} = ctx.request.params;
  const userId = ctx.request.user.id;
  try {
    const user = await User.findOne({
      where:{
        id:userId
      }
    });
    await likedPost(userId,true,idPost);
    const post = await Post.findOne({
      where:{
        id:idPost
      },
      include:["user"]
    });
    const text = `Your post are liked on by ${user.username}`;
    await sendEmailNotification(post.user.email,post.user.username,text);
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      "message":"Like Post"
    }
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }
}
exports.dislikePost = async(ctx) => {
  const {idPost} = ctx.request.params;
  const userId = ctx.request.user.id;
  try {
    await likedPost(userId,false,idPost);
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
    const text = `Your post are disliked on by ${user.username}`;
    await sendEmailNotification(post.user.email,post.user.username,text);
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      "message":"Dislike Post"
    }
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }

}
const likedPost = async (userId,liked,idPost) => {
  const like = await Like.findOne({
    where:{
      postId:idPost,
      userId:userId
    }
  });
  if (like) {
    await Like.update({
      isLiked:liked
    },
      {where:{id:like.id}
    });
  }else {
    await Like.create({
      postId:idPost,isLiked:liked,userId:userId
    });
  } 
}