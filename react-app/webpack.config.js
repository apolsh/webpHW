const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const getDestPath = ()=>{
    const split = __dirname.split("/");
    return split.slice(0, split.length - 1).join("/") + "/";
}

module.exports = {
    entry: ["@babel/polyfill" ,"./src/index.js"],
    output:{
        path: path.resolve(getDestPath(), './public/react'),     // путь к каталогу выходных файлов - папка public
        filename: "[name].[contenthash].js"       // название создаваемого файла
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ],

    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: ['file-loader']
            }
        ]
    }
}