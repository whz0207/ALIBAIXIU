const categoriesdb = require('../model/categoriesdb');

module.exports = {
    // 返回 categories 页面
    categories: (req, res) => {
        //传入 nickname,avatar
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('categories', { nickname, avatar })
    },

    // 返回所有分类数据
    getCategories: (req, res) => {
        categoriesdb.selectAll((err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            res.send({
                status: 200,
                msg: '查询成功',
                data: result
            })
        })
    },

    // 添加分类
    addCategory: (req, res) => {
        //1. 接受参数
        let parmas = req.body;
        //2. 提交数据到 mysql
        categoriesdb.addData(parmas, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: "出错了"
                })
            }
            res.send({
                status: 200,
                msg: "添加成功"
            })
        })
    },

    // 删除单个分类
    delCategory: (req, res) => {
        //1. 获取分类 id
        let id = req.query.id;
        //2. 根据 id 删除数据
        categoriesdb.delData(id, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: "出错了"
                })
            }
            res.send({
                status: 200,
                msg: "删除成功"
            })
        })
    },

    //根据 id 得到分类对象
    getCateById: (req, res) => {
        //获取分类 id
        let id = req.query.id;
        // console.log(id);

        categoriesdb.getDataById(id, (err, result) => {
            // console.log(result) //{ id: 1, slug: 'uncategorized', name: '未分类' }
            if (err) {
                return res.send({
                    status: 400,
                    msg: "出错了"
                })
            }
            res.send({
                status: 200,
                msg: "查询成功",
                data: result[0]
            })

        })

    },

    // 修改分类
    editCategory: (req, res) => {
        //接受参数
        let parmas = req.body;
        // console.log(parmas);
        //发送修改请求
        categoriesdb.editData(parmas, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: "出错了"
                })
            }
            res.send({
                status: 200,
                msg: "修改成功"
            })
        })
    },

    // 批量删除
    delAllCate: (req, res) => {
        //接受参数
        let ids = req.body.id;
        //用join方法链接,因为请求到的是一个数组
        ids = ids.join(',');
        //发送删除请求
        categoriesdb.delAllData(ids, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: "出错了"
                })
            }
            res.send({
                status: 200,
                msg: "删除成功"
            })
        })
    }
}