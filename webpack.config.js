/*
 * @Author: GXY 
 * @Date: 2017-07-28 17:42:48 
 * @Last Modified by: GXY
 * @Last Modified time: 2017-07-29 10:24:57
 */
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//  环境变量配置 dev/online 解决webpack-dev-server被打包进config文件
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


// 获取html-webpack-config 参数
const getHtmlConfig = (name) => {
  return {
    template: './src/view/' + name + '.html',   //html原始模板
    filename: 'view/' + name + '.html', //目标文件
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}


module.exports = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/login.js']
  },
  output: {
    path: __dirname + '/dist', //存放文件的路径
    publicPath: '/dist', //配置访问文件时使用的路径
    filename: 'js/[name].js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)$/, loader: "url-loader?limit=0&name=image/[name].[ext]" }
    ]
  },
  plugins: [
    //  提取公告模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    //  处理css
    new ExtractTextPlugin("css/[name].css"),
    //  处理html
    new HtmlWebpackPlugin(getHtmlConfig('index')),
  ]
};

if ('dev' === WEBPACK_ENV) {
  module.exports.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
