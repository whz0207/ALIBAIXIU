// 开启服务器
//1. 引入 express 
//2. 搭建服务器
//3. 处理静态文件
//4. 处理路由文件
const express = require('express');
const ejs = require('ejs');
const bodyParse = require('body-parser');
const cookieSession = require('cookie-session');

//引入路由文件
const userRouter = require('./router/userRouter');
const categoriesRouter = require('./router/categoriesRouter');
const loginRouter = require('./router/loginRouter');

const app = express();

//配置 ejs 模板引擎
app.set('views', './views') // 设置模板引擎的静态页面
app.set('view engine', 'ejs') // 设置渲染模板使用的引擎

// 配置 body-parser
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json());

// 配置 session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

// 配置静态文件
app.use('/assets', express.static('./assets'));
app.use('/static/uploads', express.static('./uploads'));

//注册路由中间件
app.use(loginRouter); //与登录相关的路由,该路由不能放在其他路由后面,否则会一直重复未登录弹框
app.use(userRouter); //与用户相关的路由
app.use(categoriesRouter); //与分类相关的路由

app.listen(3000, () => {
    console.log('running...');
})