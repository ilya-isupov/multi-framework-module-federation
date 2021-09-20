const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  publicPath: "http://localhost:9000/",
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "vue_app",
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./src/components/Button",
          "./Section": "./src/components/Section",
          "./App": "./src/App",
          "./AppWithRouting": "./src/appWithRouting",
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 9000,
  },
};
