//处理所有与分类目录有关的请求
//引入有关模块
const express = require('express');
const categoriesContro = require('../controller/categoriesContro');
const router = express.Router();

router.get('/categories',categoriesContro.categories)  //添加一个 categories 路由

//暴露接口
module.exports = router;