const {Post,Comentar} = require('../models');
const {postValidation} = require('../helpers/validation');
const { StatusCodes } =require('http-status-codes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

exports.searchTitle = async(ctx) => {
  const {title} = ctx.request.query;
  try {
    let post = await Post.findAll({
      where:{
        title:{
          [Op.iLike]:`%${title}%`
        }
      }
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
exports.shortPost = async(ctx) => {
  const {sort_by,order_by,title} = ctx.request.query;
  console.log("sort",sort_by);
  console.log("order",order_by);
  try {
    if (sort_by === 'username') {
      const post = await Post.findAll({
        include:['comentar','user'],
        order:[["user",sort_by,order_by]],
        where:{
          title:{
            [Op.iLike]:`%${title}%`
          }
        }
      });
      ctx.status = StatusCodes.OK;
      return ctx.body = {
        status:"success",
        data: post,
      };
    } else {
      const post = await Post.findAll({
        include:['comentar','user'],
        order:[[sort_by,order_by]],
        where:{
          title:{
            [Op.iLike]:`%${title}%`
          }
        }
      });
      ctx.status = StatusCodes.OK;
      return ctx.body = {
        status:"success",
        data: post,
      };
    }
    
  } catch (error) {
    ctx.status = StatusCodes.BAD_REQUEST;
    return ctx.body = {
      message: error.message,
    };
  }
 
}
