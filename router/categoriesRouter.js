//处理所有与分类目录有关的请求
//引入有关模块
const express = require('express');
const categoriesContro = require('../controller/categoriesContro');
const router = express.Router();

router.get('/categories',categoriesContro.categories)  //添加一个 categories 路由
    .get('/getCategories',categoriesContro.getCategories) //添加一个 显示分类数据 的路由
    .post('/addCategory',categoriesContro.addCategory) //添加一个 添加分类 的路由
    .get('/delCategory',categoriesContro.delCategory) //添加一个 删除单个分类 的路由
    .get('/getCateById',categoriesContro.getCateById)  // 添加一个根据id得到数据的路由
    .post('/editCategory',categoriesContro.editCategory) //添加一个 修改分类 的路由
    .post('/delAllCate',categoriesContro.delAllCate) //添加一个 删除多个分类的路由

//暴露接口
module.exports = router;