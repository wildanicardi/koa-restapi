const Router = require('koa-router');
const router = new Router();
const {auth} = require("../middleware/verifyToken");
const { createComentar} = require("../controllers/ComentarController");

router.post("/api/post/:idPost/comentar",auth,createComentar);

module.exports = router;