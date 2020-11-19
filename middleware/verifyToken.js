const jwt = require('jsonwebtoken');
exports.auth = (ctx, next) => {
  const token = ctx.req.headers.authorization.split(" ")[1];
  if (!token) 
  ctx.status = 401;
  ctx.body = {
    message: 'Acces Denied'
  };
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    ctx.request.user = verified;
    next();
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      message: 'Invalid Token'
    };
  }
}