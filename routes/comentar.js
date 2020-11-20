const Router = require('koa-router');
const router = new Router();
const {auth} = require("../middleware/verifyToken");
const { createComentar,replyComentar} = require("../controllers/ComentarController");

router.post("/api/post/:idPost/comentar",auth,createComentar);
router.post("/api/post/comentar/reply/:idComentar",auth,replyComentar);

module.exports = router;