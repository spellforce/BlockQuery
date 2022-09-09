
const path = require("path"); 
const express = require("express"); 
const env = process.env.NODE_ENV; 

const webpack = require("webpack"); 
const webpackDevMiddleware = require("webpack-dev-middleware"); 
const webpackHotMiddleware = require("webpack-hot-middleware"); 
const webpackConfig = require("./webpack.dev.config.js"); 
const DIST_DIR = webpackConfig.output.path;

const app = express();
const PORT = 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (env === "production") {
  // 如果是生产环境，则运行build文件夹中的代码
  PORT = 8889;
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  const compiler = webpack(webpackConfig); // 实例化webpack
  app.use(express.static("dll"));
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
    }),
  );

  app.use(webpackHotMiddleware(compiler)); // 挂载HMR热更新中间件
  // 所有请求都返回index.html
  app.get("*", (req, res, next) => {
    const filename = path.join(DIST_DIR, "index.html");

    // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
}

/** 启动服务 **/
app.listen(PORT, () => {
  console.log("本地服务启动地址: http://localhost:%s", PORT);
});