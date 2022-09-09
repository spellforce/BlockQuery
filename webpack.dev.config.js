const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const threadLoader = require('thread-loader');
// const HappyPack = require("happypack");
const CopyPlugin = require("copy-webpack-plugin"); // 用于直接复制public中的文件到打包的最终文件夹中
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将CSS从JS中提出
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  // cache: {
  //   type: 'filesystem', // memory | filesystem
  //   allowCollectingMemory: true, // 仅当 cache.type 设置为 'filesystem' 时生效。这需要将数据复制到更小的缓冲区中，并有性能成本。
  // },
  entry: [
    "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr", // webpack热更新插件，就这么写
    path.resolve(__dirname, './src/index.js'), // 项目入口
  ],
  output: {
    // 给输出的文件名称加上 hash 值
    path: path.resolve(__dirname, "build"), // 将文件打包到此目录下
    publicPath: "/", // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    // chunkhash 针对于输出文件 contenthash 单个文件的内容相关。指定文件的内容发生改变，就会改变hash
    filename: "build/[name].[chunkhash:8].js",
    chunkFilename: "build/[name].[chunkhash:8].chunk.js", //未在entry中的，一些异步的import也要打包出来
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  // debounce
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    mainFields: ['jsnext:main', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.less$/,
        use: ["style-loader", 'css-loader', {
          loader: "less-loader",
          options: { lessOptions: { javascriptEnabled: true } },
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Block Qyery", //对应打包后html文件 title 模板用法
      template: path.resolve(__dirname, "./public/index.html"), //html配置路径
      filename: "index.html",
    }),
    new AntdDayjsWebpackPlugin(),
    /**
     * 拷贝public中的文件到最终打包文件夹里
     * https://github.com/webpack-contrib/copy-webpack-plugin
     * */
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public"),
          to: "[path][name].[contenthash:8][ext]",
          globOptions: {
            ignore: ["**/index.html"],
          },
          // noErrorOnMissing: true,
        },
      ],
    }),
    // 提取 CSS 文件
    new MiniCssExtractPlugin({
      filename: "build/[name].[contenthash:8].css", // 生成的文件名
    }),
  ]
};
