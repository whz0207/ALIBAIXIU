//引入 数据库文件 userdb.js
const userdb = require('../model/userdb');
const formidable = require('formidable');
const path = require('path');

//处理所有与 用户有关的逻辑代码
module.exports = {
    // 获取所有的用户信息并且渲染页面
    getUser: (req, res) => { // 在服务器中通过 ejs 结合 mysql 提供的数据进行渲染
        if (isBroLogin(req, res)) {
            return;
        }
        // 将所有的用户数据查询出来
        userdb.query('SELECT * FROM users', (err, result) => {
            if (err) {
                return res.send('<script>alert("' + err.message + '")</script>');
            }
            //渲染页面,渲染数据
            // 还要将昵称渲染到页面上
            let nickname = req.session.user.nickname;
            let avatar = req.session.user.avatar;
            res.render('users', { result: result, nickname, avatar });
        })
    },

    // 添加用户数据
    addUser: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        //1. 获取用户 id
        var parmas = req.body;
        //2. 将数据提交到数据库
        let addSql = `INSERT INTO users (slug,email,password,nickname,status) VALUES ('${parmas.slug}','${parmas.email}','${parmas.password}','${parmas.nickname}','activated')`;
        //3. 执行 SQL 语句
        userdb.query(addSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '新增用户失败'
                })
            }
            res.send({
                status: 200,
                msg: '新增用户成功'
            })
        })
    },

    //获取所有用户数据
    getAllusers: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        userdb.query('SELECT * FROM users', (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '数据获取失败'
                })
            }
            res.send({
                data: result,
                status: 200,
                msg: '数据获取成功'
            })
        })
    },

    //删除单个用户数据
    delUser: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        //1. 获取用户 id
        let id = req.query.id;
        //2. 将数据删除
        let delSql = `DELETE FROM users WHERE id = ${id}`;
        //3. 执行 SQL 语句
        userdb.query(delSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '删除不成功'
                })
            }
            res.send({
                status: 200,
                msg: '删除成功'
            })
        })
    },

    // 根据用户id 获取用户对象
    getUserById: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        //1. 获取用户 id
        let id = req.query.id;
        //2. 根据 id 查询数据
        let selSql = `SELECT * FROM users WHERE id = ${id}`;
        //3. 执行 SQL 语句
        userdb.query(selSql, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '查询失败'
                })
            }
            // console.log(result[0])
            res.send({
                status: 200,
                msg: '查询成功',
                data: result[0]
            })
        })
    },

    // 修改用户数据
    editUser: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        //1. 接收参数
        var parmas = req.body;
        // console.log(parmas);
        //2. 修改数据到 mysql
        let editSql = `UPDATE users SET email = '${parmas.email}', nickname = '${parmas.nickname}', password = '${parmas.password}' WHERE id = ${parmas.id}`;
        //3. 执行SQL语句
        userdb.query(editSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '修改失败'
                })
            }
            res.send({
                status: 200,
                msg: '修改成功'
            })
        })
    },

    // 删除多个用户数据
    delUserByIds: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }

        //1. 接收id参数
        let ids = req.body.id; // { id : [1,2,3]}
        //将数组的数据用join方法连接
        let idsStr = ids.join(',');
        //2. 删除多个数据
        let delSqls = `DELETE FROM users WHERE id in (${idsStr})`;
        //3. 执行 SQL 语句
        userdb.query(delSqls, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '删除不成功'
                })
            }
            res.send({
                status: 200,
                msg: '删除成功'
            })
        })
    },

    // 个人中心页面
    profile: (req, res) => {
        //得到当前登陆用户的 id
        let id = req.session.user.id;
        // 根据 id 获取数据
        userdb.getUserById(id, (err, result) => {
            if (err) {
                // 跳转回 user 页面(404)
                return res.send(`<script>alert('出错啦');window.location='/user'</script>`);
            }
            res.render('profile', result[0]);

        })
    },

    // 修改个人信息
    updateProfile: (req, res) => {
        //1. 接受参数
        let form = new formidable.IncomingForm();
        // 修改图片上传后保存的路径
        let imgPath = path.join(__dirname, '../uploads');
        form.uploadDir = imgPath
        // console.log(imgPath);
        // 保留图片后缀
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错了'
                })
            }
            // 修改 别名 昵称 图片 说明
            // 创建一个对象 obj, 包含以下属性别名 昵称 图片 说明 id
            // 只需要在 fields 添加一张图片信息
            // 判断图片是否存在
            if (files.img) {
                let name = path.basename(files.img.path);
                fields.img = '/static/uploads/' + name;
            }
            // 当修改了个人中的图片和昵称需要将 session 中的信息进行更新
            req.session.user.nickname = fields.nickname;
            req.session.user.avatar = fields.img;
            // 2. 将参数添加到数据库
            userdb.updateMsgById(fields, (err1, result) => {
                if (err1) {
                    return res.send({
                        status: 400,
                        msg: '出错了'
                    })
                }
                res.send({
                    status: 200,
                    msg: '更新数据成功'
                })

            })
        })
    },

    // 获取修改密码页面
    getResetPwd: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }
        // 从 session 中获取用户名和头像
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;
        res.render('password-reset', { nickname, avatar });
    },

    // 修改密码
    resetPwd: (req, res) => {
        if (isXhrLogin(req, res)) {
            return;
        }
        //1. 接收参数
        let id = req.session.user.id;
        userdb.getPwdById(id, (err, result) => {
            //验证密码是否正确
            if (req.body.old === result[0].password) {
                //2. 将新密码存进数据库
                userdb.resetUserPwd(id,req.body.password, (err, result) => {
                    if (err) {
                        return res.send({
                            status: 400,
                            msg: '出错了'
                        })
                    } else {
                        //修改成功后清除用户的session,重新登录
                        req.session.user = null;
                        res.send({
                            status: 200,
                            msg: '密码修改成功'
                        })
                    }

                })
            } else {
                res.send({
                    status: 300,
                    msg: '您输入的旧密码有误!'
                })
            }
        })
    }
}

//发送的是异步请求的话验证是否登录
function isXhrLogin(req, res) {
    if (!req.session.user) {
        res.send({
            status: 400,
            msg: '您还没有登录'
        })
        return true;
    }
    return false;
}

//不是异步请求
function isBroLogin(req, res) {
    if (!req.session.user) {
        return res.send('<script>alert("你还没有登录");window.location="/login"</script>');
    }
}