const Router = require('koa-router');
const router = new Router();
const {auth} = require("../middleware/verifyToken");
const { postIndex, postStore, postUpdate, postDelete,postDetail,searchTitle} = require("../controllers/PostController");

router.get("/api/posts",auth,postIndex);
router.post("/api/post",auth,postStore);
router.get("/api/post/search",auth,searchTitle);
router.get("/api/post/:id",auth,postDetail);
router.put("/api/post/:id",auth,postUpdate);
router.delete("/api/post/:id",auth,postDelete);

module.exports = router;