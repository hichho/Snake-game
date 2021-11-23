//引入一个包
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//清除上次打包文件
//webpack的所有配置信息
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    output: {
        //指定打包文件所在目录
        path: path.resolve(__dirname, "dist"),
        //打包后文件的文件
        filename: "bundle.js",
    },
    //指定webpack打包时要使用的模块
    module: {
        rules: [
            {
                //test指定规则生效的文件
                test: /\.ts$/,
                //要使用的loader
                use: [
                    {
                        //设置babel
                        loader: "babel-loader",
                        options: {
                            //设置环境的插件
                            presets: [
                                //指定环境的插件
                                "@babel/preset-env",
                                {
                                    // targets: {
                                    //     "chrome": "88",
                                    //     // "ie":"11"
                                    // },
                                    //指定corejs 的版本
                                    // "corejs": "3",
                                    // //使用corejs  的方式usage按需加载
                                    // "useBuiltIns": "usage"
                                }
                            ],
                        },
                    }, "ts-loader"],
                //要排除的文件
                exclude: /node-modules/
            },
            //设置less 文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入post-css
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugin: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        },
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            //设置生成的网页的title
            //  title:"demo-title"
            //生成的网页模板
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    //以这些文件为后缀名的可以做为模块
    resolve: {
        extensions: [".ts", ".js"]
    }
};

