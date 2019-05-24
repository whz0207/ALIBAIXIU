//引用db.js
const db = require('./db.js');

module.exports = {
    query: db.query,
    // 得到文章数据
    getPostsData: (option, callback) => {
        //拼接 sql 语句
        // SELECT posts.*,                 //查询posts所有的信息
        //        users.nickname,         //查询users表中的nickname信息
        //        categories.name        //查询categories表中的name信息
        // FROM posts                     //从post表中获取信息
        // LEFT JOIN users ON posts.user_id = users.id     //左连接连users表, posts表中的user_id 跟 users表的id 数据相同
        // LEFT JOIN categories ON posts.category_id = categories.id   //左连接连categories表, posts表中的category_id 跟 categories表的id 数据相同
        // ORDER BY id DESC               //根据 id 降序排序
        // LIMIT 0,10                      //从0后面的数据开始取,取10条数据
        //获取数据
        let Sql = `SELECT posts.*,users.nickname, categories.name  FROM posts `
        //左连接连users表, posts表中的user_id 跟 users表的id 数据相同
        Sql += `LEFT JOIN users ON posts.user_id = users.id `
        //左连接连categories表, posts表中的category_id 跟 categories表的id 数据相同
        // 此处 WHERE 1 = 1表示恒真,即 true ,防止后面直接用 and 连接会报错
        Sql += `LEFT JOIN categories ON posts.category_id = categories.id WHERE 1 = 1 `
        // 判断条件:
        let condition = '';
        // 判断分类是否存在
        if (option.sel && option.sel != 0) {
            //说明有分类条件
            condition += `and posts.category_id = ${option.sel} `
        }
        // 判断状态是否存在
        if (option.sta && option.sta != 0) {
            //说明有状态条件
            condition += `and posts.status = '${option.sta}' `
        }
        // 添加筛选条件
        Sql += condition
        //根据 id 降序排序
        Sql += `ORDER BY posts.id desc `
        //从${(page - 1) * pagesize}后面的数据开始取,取${pagesize}条数据
        Sql += `LIMIT ${(option.page - 1) * option.pagesize}, ${option.pagesize}; `
        Sql += `SELECT count(*) FROM posts WHERE 1 = 1 `
        Sql += condition
        //执行 sql 语句
        db.query(Sql, (err, result) => (
            callback(err, result)
        ))
    },

    //新增文章数据
    addpost: (obj, callback) => {
        // 拼接 sql 语句
        let sql = `INSERT INTO posts (slug, title, feature, created, content, status, user_id, category_id) VALUES ('${obj.slug}', '${obj.title}', '${obj.feature}', '${obj.created}', '${obj.content}', '${obj.status}', ${obj.user_id}, ${obj.category_id})`;
        // 执行 sql 语句
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },

    // 通过 id 获取文章
    getPostById: (id, callback) => {
        // 拼接 sql
        let sql = `SELECT * FROM posts WHERE id = ${id};
                SELECT * FROM categories`;
        // 执行 sql
        db.query(sql, (err, result) => {
            callback(err, result);
        })
    },

    // 更新数据到数据库
    updatepost: (obj, callback) => {
        //拼接 sql
        let sql = `UPDATE posts SET title = '${obj.title}', content = '${obj.content}', slug = '${obj.slug}', category_id = '${obj.category}', created = '${obj.created}', status = '${obj.status}', feature = '${obj.feature}'  WHERE id = ${obj.id}`;
        //执行 sql
        db.query(sql, (err, result) => {
            callback(err, result);
        })
    }
}