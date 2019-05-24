//处理所有与 用户 有关的路由
const express = require('express');
const userContro = require('../controller/userContro');
const router = express.Router();

/* 这个验证方法有缺陷,当你成功登录后,清除cookie数据后,若添加数据,异步请求无法识别
 res.send('<script>alert("你还没有登录");window.location="/login"</script>')这段代码,所以需要到用户的每一个路由中去验证是否登录.如果是异步请求则用JSON格式发送错误信息,如果不是异步则用script语句发送
*/

// router.use((req, res, next) => {
//     //验证是否登录
//     if(req.session.user) {
//         next();
//     } else {
//         res.send('<script>alert("你还没有登录");window.location="/login"</script>')
//     }
// })

//得到静态页面
router.get('/user', userContro.getUser)
    .post('/addUser', userContro.addUser)  // 添加一个添加用户的路由
    .get('/getAllusers', userContro.getAllusers)  // 添加一个获取所有用户信息的路由
    .get('/delUser', userContro.delUser)  // 添加一个删除单个用户数据的路由
    .get('/getUserById', userContro.getUserById)  // 添加一个根据id得到数据的路由
    .post('/editUser', userContro.editUser)  // 添加一个修改用户数据的路由
    .post('/delUserByIds', userContro.delUserByIds) //添加一个删除多个用户数据的路由
    .get('/profile',userContro.profile) //添加一个 显示个人中心页面 的路由
    .post('/updateProfile',userContro.updateProfile) //添加一个 修改个人信息 的路由
    .get('/password-reset',userContro.getResetPwd) //添加一个 获取修改密码页面 的路由
    .post('/resetPwd',userContro.resetPwd) //添加一个 修改密码 的路由

//暴露接口
module.exports = router;