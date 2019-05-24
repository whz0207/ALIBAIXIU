const express = require('express');
const articleContro = require('../controller/articleContro.js');
const router = express.Router();

router.get('/posts',articleContro.posts) //添加一个 获取所有文章页面 的路由
    .get('/getPostData',articleContro.getPostData) //添加一个 获取所有文章数据 的路由
    .get('/post-add',articleContro.postadd) //添加一个 获取添加文章页面 的路由
    .post('/postsave',articleContro.postsave) //添加一个 添加文章 的路由
    .get('/post-edit',articleContro.postEdit) //添加一个 修改文章 的路由
    .get('/getPostById',articleContro.getPostById) //添加一个 通过id获取文章数据 的路由
    .post('/updatePost',articleContro.updatePost) //添加一个 修改文章 的路由

module.exports = router;