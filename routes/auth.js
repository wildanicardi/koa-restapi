const Router = require('koa-router');
const router = new Router();
const {
  registerUser,
  login,
  verifyEmail
} = require('../controllers/AuthController');

router.post("/api/auth/register", registerUser);
router.post("/api/auth/login", login);
router.post("/api/auth/email/verify", verifyEmail);

module.exports = router;