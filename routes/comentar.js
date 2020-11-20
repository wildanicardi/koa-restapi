const Router = require('koa-router');
const router = new Router();
const {auth} = require("../middleware/verifyToken");
const { createComentar,replyComentar} = require("../controllers/ComentarController");

router.post("/api/post/:idPost/comentar",auth,createComentar);
router.post("/api/comentar/:idComentar/reply",auth,replyComentar);

module.exports = router;