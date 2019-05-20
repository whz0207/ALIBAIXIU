//引入 logindb
const logindb = require('../model/logindb');

module.exports = {
    //渲染Login页面
    getLogin: (req, res) => {
        res.render('login', {});
    },

    // 提交登录数据
    loginPostData: (req, res) => {
        //1. 接收提交的参数
        let parmas = req.body;
        //2. 调用 db 中的方法验证参数的合法性
        logindb.getPwdByEmail(parmas.email, (err, result) => {
            // console.log(result);

            // 如果数据库中没有对应的email,则 result 为[]
            // 如果数据库中有对应的email,则 result 为 [{password : ''}]
            if (err) {
                return res.send({
                    status: 400,
                    msg: '验证出错'
                })
            }
            if (result.length == 0) {
                return res.send({
                    status: 401,
                    msg: '邮箱或者密码不正确'
                })
            }
            if (result[0].password != parmas.password) {
                return res.send({
                    status: 402,
                    msg: '密码错误'
                })
            }
            // 登录成功
            // 要将用户的登录信息保存起来
            req.session.user = {
                email: parmas.email,
                password: parmas.password,
                // 保存用户登录的昵称,id
                nickname: result[0].nickname,
                id: result[0].id,
                avatar: result[0].avatar
            }
            // console.log(req.session.user); //{ email: 'wuwuw', password: '123123', nickname: 'ooooo', id: 10 }

            res.send({
                status: 200,
                msg: '登陆成功'
            })
        })
    },

    // 退出登录
    logout: (req, res) => {
        // 服务器清除 session 
        req.session.user = null;
        // 响应退出成功的信息给浏览器
        res.send({
            status:200,
            msg:'退出成功'
        })
    }
}