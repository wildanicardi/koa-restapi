const Router = require('koa-router');
const router = new Router();
const {auth} = require("../middleware/verifyToken");
const {likePost,dislikePost} = require("../controllers/LikeController");

router.post("/api/post/:idPost/like",auth,likePost)
router.post("/api/post/:idPost/dislike",auth,dislikePost)

module.exports = router;