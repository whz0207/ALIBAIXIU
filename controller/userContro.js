//引入 数据库文件 userdb.js
const userdb = require('../model/userdb');

//处理所有与 用户有关的逻辑代码
module.exports = {
    // 获取所有的用户信息并且渲染页面
    getUser: (req, res) => { // 在服务器中通过 ejs 结合 mysql 提供的数据进行渲染
        // 将所有的用户数据查询出来
        userdb.query('SELECT * FROM users', result => {
            //渲染页面,渲染数据
            res.render('users', { result: result });
        })
    },

    // 添加用户数据
    addUser: (req, res) => {
        //1. 获取用户 id
        var parmas = req.body;
        //2. 将数据提交到数据库
        let addSql = `INSERT INTO users (slug,email,password,nickname,status) VALUES ('${parmas.slug}','${parmas.email}','${parmas.password}','${parmas.nickname}','activated')`;
        //3. 执行 SQL 语句
        userdb.query(addSql, result => {
            res.send({
                status: 200,
                msg: '新增成功'
            })
        })
    },

    //获取所有用户数据
    getAllusers: (req, res) => {
        userdb.query('SELECT * FROM users', result => {
            res.send({
                data: result,
                status: 200,
                msg: '数据获取成功'
            })
        })
    },

    //删除单个用户数据
    delUser: (req, res) => {
        //1. 获取用户 id
        var id = req.query.id;
        //2. 将数据删除
        let delSql = `DELETE FROM users WHERE id = ${id}`;
        //3. 执行 SQL 语句
        userdb.query(delSql, result => {
            res.send({
                status: 200,
                msg: '删除成功'
            })
        })
    },

    
}