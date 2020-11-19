const Router = require('koa-router');
const router = new Router();
const {auth} = require("../middleware/verifyToken");
const { postIndex, postStore, postUpdate, postDelete} = require("../controllers/PostController");

router.get("/api/posts",auth,postIndex);
router.post("/api/post",auth,postStore);
router.put("/api/post/:id",auth,postUpdate);
router.delete("/api/post/:id",auth,postDelete);

module.exports = router;