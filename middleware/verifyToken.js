const jwt = require('jsonwebtoken');
const secret = "secret";
exports.auth = async (ctx,next) => {
  const token = await ctx.headers.authorization.split(" ")[1];
  if (!token) {
    ctx.status = 401;
    return ctx.body = {
      message: 'Acces Denied'
    };
  } 
  try {
    ctx.request.user = jwt.verify(token, secret);
    await next();
  } catch (error) {
    ctx.status = 400;
    return ctx.body = {
      message: error.message
    };
  }
}