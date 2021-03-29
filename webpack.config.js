const path = require("path")
module.exports = {
    mode:'development',
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        publicPath: '/vrital/'
    },
    devServer:{
        port: 9000,
        host: 'localhost',
        contentBase: 'public'//开发服务器访问根目录
    }
}