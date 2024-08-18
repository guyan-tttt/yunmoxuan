require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const JWT = require('./utils/JWT')
const cors = require('cors');
var expressip = require('express-ip');


// 后台路由导入
const userRouter = require('./routes/admin/userRouter');
const tagsRouter = require('./routes/admin/tagsRouter');
const categoryRouter = require('./routes/admin/categoryRouter')
const articleRouter = require('./routes/admin/articleRouter')
const imageCategory = require('./routes/admin/imageCategory')
const imageRouter = require('./routes/admin/imageRouter')
const trendsRouter = require('./routes/admin/trendsRouter')
const dashboardRouter = require('./routes/admin/dashboardRouter')
const guestbookRouter = require('./routes/admin/guestbookRouter')
const sourceRouter = require('./routes/admin/sourceRouter')
// 路由导入

// 前台路由导入
const indexRouter  = require("./routes/web/indexRouter")
const articleHomeRouter = require("./routes/web/articleRouter")
const trendsHomeRouter = require("./routes/web/trendsRouter")
const pictureRouter = require("./routes/web/pictureRouter")
const guestbookHomeRouter = require("./routes/web/guestbookRouter")
const sourceHomeRouter = require("./routes/web/sourceRouter")
// 前台路由导入

// 导入websocket
const WebSocket = require('./websocket/app')

// 创建服务器
var app = express();

// 挂载插件获取ip
app.use(expressip().getIpInfoMiddleware);

// 跨域配置，用于前端请求获取后端图片信息
app.use(cors({
  origin: 'http://localhost:3333' // 只允许 http://localhost:3000 这个域名
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由挂载区域
// 前台接口
app.use('/api/web/index', indexRouter);
app.use('/api/web/article', articleHomeRouter);
app.use("/api/web/trends",trendsHomeRouter)
app.use('/api/web/picture',pictureRouter)
app.use('/api/web/guestbook',guestbookHomeRouter)
app.use('/api/web/source',sourceHomeRouter)
// token校验
app.use((req,res,next) => {

  // 判断是否带有token
  if(req.url === "/api/admin/user/login" && req.method === "POST") {
    next();
  } else {
    const token = req.headers['authorization'].split(" ")[1]
    if(token) {
      // jwt校验
      JWT.verify(token,(err,data) => {
        if(err) {
          res.status(401).send({
            code: 401,
            msg: "token失效"
          })
        } else  {
          console.log(data);
          // 生成新token
          const newToken = JWT.generate({
            id: data.id,
            username: data.username
          },"48h")
          res.setHeader("token",newToken)
          // 继续向下执行
          next()
        }
      })
    }  else {
      res.status(401).send({
        code: 401,
        msg: "token不存在"
      })
    }
  }
})

// 后台接口
app.use("/api/admin/dashboard", dashboardRouter)
app.use('/api/admin/user', userRouter);
app.use('/api/admin/tag',tagsRouter)
app.use('/api/admin/category',categoryRouter)
app.use('/api/admin/article',articleRouter)
app.use('/api/admin/imageCategory',imageCategory)
app.use('/api/admin/image',imageRouter)
app.use('/api/admin/trends',trendsRouter)
app.use('/api/admin/guestbook', guestbookRouter)
app.use('/api/admin/source',sourceRouter)
// 路由挂载区域

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
