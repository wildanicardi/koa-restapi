const {Like} = require('../models');
const { StatusCodes } =require('http-status-codes');


exports.likePost = async (ctx) => {
  const {idPost} = ctx.request.params;
  const userId = ctx.request.user.id;
  try {
    await likedPost(userId,true,idPost);
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
    where:{postId:idPost}
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