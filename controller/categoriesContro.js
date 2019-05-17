const categoriesdb = require('../model/categoriesdb');

module.exports = {
    // 返回 categories 页面
    categories: (req, res) => {
        res.render('categories',{});
    }
}