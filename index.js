const Koa = require('koa');
// const Logger = require('koa-logger');
var requests = require('koa-log-requests');
const bodyParser = require("koa-bodyparser");
const cors = require('@koa/cors');
const dotenv = require("dotenv");
const mongoose = require('mongoose');

// import route
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const comentarRoute = require("./routes/comentar");
const likeRoute = require("./routes/like");
dotenv.config();
// Define PORT
const PORT = process.env.PORT || 8080;
const app = new Koa();
app.use(requests());
app.use(cors());
app.use(bodyParser());
// mongoose.connect("mongodb://localhost:27017/logging", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });
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

