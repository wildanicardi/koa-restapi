const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const bodyParser = require("koa-bodyparser");
const cors = require('@koa/cors');
const dotenv = require("dotenv");

// import route
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const comentarRoute = require("./routes/comentar");
const likeRoute = require("./routes/like");
dotenv.config();
const app = new Koa();
app.use(Logger());
app.use(cors());
app.use(bodyParser());
// Define PORT
const PORT = process.env.PORT || 8080;
// const router = new Router();

// router.get('/',async (ctx) => {
//   ctx.body = "Hello World"
// });

// // Add routes and response to the OPTIONS requests
// app.use(router.routes()).use(router.allowedMethods());
app.use(authRoute.routes());
app.use(postRoute.routes());
app.use(comentarRoute.routes());
app.use(likeRoute.routes());
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
});
// Listen the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

