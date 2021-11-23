const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');//npm 安装得到
const {CleanWebpackPlugin} = require('clean-wenpack-plugin');

//webpack中的所哟配置都应该写在module.export中
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    //指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
//打包后文件
        filename: 'bundle.js',
        environment: {
            arrowFunction: false
        },
    },
    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //指定规则生效的文件
                test: /\.ts$/,
                //要使用的loader
                use: [
                    //配置babel-loader
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        options: {
                            //设置
                            presets: [
                                //指定环境插件
                                "@babel/preset-env",
                                //配置信息
                                {
                                    //希望兼容的浏览器版本
                                    targets: {
                                        "chrome": "88",
                                        "ie": "11",
                                    },
                                    //指定corejs的版本 ，比如promise ，在ie环境中跑，需要corejs ，但是仍然会出现箭头函数的问题，
                                    // 要解决箭头函数的问题，需要在environment 中再配置
                                    "corejs": "3",
                                    //指定corejs的方式 (表示按需加载)
                                    "useBuiltIns": "usage",
                                }
                            ]
                        }
                    }, 'ts-loader'],
                //要排除的文件
                exclude: /node-modules/
            }
        ]
    },

    //配置webpack 插件
    plugins: [
        new HTMLWebpackPlugin({
            title: '自定义title',//打包后文件的名称
            template: './src/index.html',//模板文件
        }),//自动引入Html
        new CleanWebpackPlugin(),//清空上次打包内容的插件
        //用来设置饮用模块
    ],
    resolve: {
        extensions: ['.ts', '.js'] //这些文件可以做为模块引用
    },
};
