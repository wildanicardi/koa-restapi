const jwt = require('jsonwebtoken');
const {
  StatusCodes
} =require('http-status-codes');
exports.auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({
    status: 401,
    message: 'Acces Denied'
  });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 400,
      message: 'Invalid Token'
    });
  }
}