//执行与用户有关的所有数据库操作
const mysql = require('mysql');

module.exports.query = (sql, callback) => {
    //创建一个连接对象
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'alibaixiu'
    })
    // 用户连接
    connection.connect();
    //执行 SQL 语句
    connection.query(sql, (err, result) => {
        if (err) {
            return console.log(err.message);
        }
        // 执行回调函数
        callback(result);
    })

    //关闭连接
    connection.end();
}