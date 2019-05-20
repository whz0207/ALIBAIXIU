//处理所有与登录有关的路由
const express = require('express');
const loginContro = require('../controller/loginContro');
const router = express.Router();

router.get('/login',loginContro.getLogin) //添加一个 获取登录页面 的路由
    .post('/loginPostData',loginContro.loginPostData) //添加一个 提交登录数据 的路由
    .get('/logout',loginContro.logout) //添加一个 退出登录 的路由

//暴露接口
module.exports = router;