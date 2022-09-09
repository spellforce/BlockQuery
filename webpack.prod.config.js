const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const threadLoader = require('thread-loader');
const TerserPlugin = require("terser-webpack-plugin"); 
const CopyPlugin = require("copy-webpack-plugin"); 
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
// const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
  mode: "production",
  cache: {
    type: 'filesystem', // memory | filesystem
    allowCollectingMemory: true,
  },
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    // 给输出的文件名称加上 hash 值
    path: path.resolve(__dirname, "build"), // 将文件打包到此目录下
    publicPath: "/",
    filename: "dist/[name].[chunkhash:8].js",
    chunkFilename: "dist/[name].[chunkhash:8].chunk.js", //未在entry中的，一些异步的import也要打包出来
  },
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',  // 包含一个新模块的引用时，之前的module id不变，也就不需要重新打包
    minimizer: [ // 压缩代码
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            // drop_debugger: true, // 删除所有的debugger
            // side_effects: false
            // drop_console: true, // 删除所有的console.*
            // pure_funcs: ["console.log"], // 删除所有的console.log
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      // 把库的代码分离出来
      // cacheGroups: {
      //   common: {
      //     name: 'common',
      //     chunks: 'all',
      //     minChunks: 2,
      //     maxInitialRequests: 5,
      //     minSize: 0,
      //     priority: 1,
      //     enforce: true,
      //     reuseExistingChunk: true,
      //   },
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendors',
      //     chunks: 'all',
      //   },
      // },
    },
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
        // use: ['thread-loader', 'babel-loader?cacheDirectory']
        // use: ['happypack/loader?id=babel']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: "less-loader",
          options: { lessOptions: { javascriptEnabled: true } },
        }]
        // use: ['happypack/loader?id=less']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Block Qyery", //对应打包后html文件 title 模板用法
      template: path.resolve(__dirname, "./public/index.html"), //html配置路径
      filename: "index.html",
    }),
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
    new AntdDayjsWebpackPlugin(),
    // 提取 CSS 文件
    new MiniCssExtractPlugin({
      filename: "dist/[name].[contenthash:8].css", // 生成的文件名
    }),
  ]
};
