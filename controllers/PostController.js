const {Post} = require('../models');
const {postValidation} = require('../helpers/validation');
const { StatusCodes } =require('http-status-codes');

exports.postStore = async (ctx) => {
  const {title,description} = ctx.request.body;
  const userId = ctx.request.user.id;
  const {error} = postValidation({title,description});
  if (error){
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: `Kesalahan dalam validasi ${error}`,
    };
  }
  try {
    const post = await Post.create({
      title,description,userId:userId
    });
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      status:"created success",
      data: post,
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = {
      status: 400,
      message: error.message,
    };
  }
}
exports.postIndex = async (ctx) => {
  try {
    const post = await Post.findAll();
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      status:"success",
      data: post,
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }
}
exports.postUpdate = async(ctx) =>{
  const {title,description} = ctx.request.body;
  const {id} = ctx.request.params;
  const userId = ctx.request.user.id;
  const {error} = postValidation({title,description});
  if (error){
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      status: 400,
      message: `Kesalahan dalam validasi ${error}`,
    };
  }
  try {
    const data = await Post.findOne({
      where:{
        id:id
      }
    });
    if (data) {
      const post = await Post.update({
        title,description,userId:userId
      },
        {where:
          {
          id:id
        }
      });
      ctx.status = StatusCodes.OK;
      return ctx.body = {
        status:"update success"
      };
    }else {
      ctx.status = StatusCodes.BAD_REQUEST;
      return ctx.body = {
        message: `tidak ada data dengan id ${id} tersebut`,
      };
    }
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }
}
exports.postDelete = async(ctx) => {
  try {
    const { id } = ctx.request.params;
    const post = await Post.destroy({
      where: {
        id: id
      },
    });
    if (post) {
      ctx.status = StatusCodes.OK ;
      return ctx.body = {
        status:"deleted success",
      };
    } else {
      ctx.body = {
        message: `product dengan id=${id} tidak ada`,
      };
    }
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }
}

exports.postDetail = async(ctx) => {
  const {id} = ctx.request.params;
  try {
    const post = await Post.findOne({
      where:{id:id},
      include:["comentar"]
    });
    ctx.status = StatusCodes.OK;
    return ctx.body = {
      status:"success",
      data: post,
    };
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }
}
