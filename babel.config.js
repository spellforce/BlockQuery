module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: { node: "current" },
      },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-modules-commonjs",
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      },
    ],
  ],
};
