const articledb = require('../model/articledb.js');
let formidable = require('formidable');
const path = require('path');

module.exports = {

    //得到所有文章页面
    posts: (req, res) => {
        //去 session 中获取两个参数
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;
        res.render('posts', { nickname, avatar });
    },

    //获取文章数据
    getPostData: (req, res) => {
        // 接收当前页和每页显示数量
        let page = req.query.page;
        let pagesize = req.query.pagesize;
        let sel = req.query.sel //分类
        let sta = req.query.sta //状态
        // 调用操作数据库的方法
        let options = {
            page,
            pagesize,
            sel,
            sta
        }
        articledb.getPostsData(options, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错了'
                })
            }
            res.send({
                status: 200,
                msg: '成功',
                data: result
            })
        })
    },

    //渲染写文章页面
    postadd: (req, res) => {
        //去 session 中获取两个参数
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;
        res.render('post-add', { nickname, avatar });
    },

    // 添加文章
    postsave: (req, res) => {
        //接受参数
        let form = new formidable.IncomingForm();
        // 将图片保存到 uploads 中
        form.uploadDir = path.join(__dirname, '../uploads');
        form.keepExtensions = true; //保存后缀
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '新增失败'
                })
            }
            // 创建一个文章对象
            var obj = {
                slug: fields.slug,
                title: fields.title,
                created: fields.created,
                content: fields.content,
                status: fields.status,
                // 这是作者: 去 session 的 user 中的 id 中获取
                user_id: req.session.user.id,
                category_id: fields.category
            }
            // 图片最后处理
            if (files.feature) {
                let name = path.basename(files.feature.path);
                obj.feature = name;
            } else {
                obj.feature = '';
            }
            // 保存数据到数据库
            articledb.addpost(obj, (err1, result) => {
                console.log(obj);

                if (err1) {
                    return res.send({
                        status: 400,
                        msg: '新增失败'
                    })
                }
                res.send({
                    status: 200,
                    msg: '新增成功'
                })
            })
        })
    },

    // 处理得到编辑文章页面
    postEdit: (req, res) => {
        //去 session 中获取两个参数
        let nickname = req.session.user.nickname;
        let avatar = req.session.user.avatar;
        res.render('post-edit', { nickname, avatar });
    },

    // 通过 id 得到文章
    getPostById: (req, res) => {
        //1. 接受参数
        let id = req.query.id;
        //2. 获取数据
        articledb.getPostById(id, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错了'
                })
            }
            res.send({
                status: 200,
                msg: '查询成功',
                data: result
            })
        })
    },

    // 修改文章
    updatePost: (req, res) => {
        //接收参数
        var form = new formidable.IncomingForm();
        //设置保存路径
        form.uploadDir = path.join(__dirname, '../uploads');
        // 保留后缀
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            // console.log(fields);
            // console.log(files);

            // 如果上传了图片需要得到图片的路径
            if (files.feature) {
                fields.feature = '/static/uploads/' + path.basename(files.feature.path);
            }
            // 将对象更新到数据库
            articledb.updatepost(fields, (err, result) => {
                if (err) {
                    return res.send({
                        status: 400,
                        msg: '出错了'
                    })
                }
                res.send({
                    status: 200,
                    msg: '修改成功'
                })
            })
        })
    }
}