module.exports = function override(config, env) {
    const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

    console.log();
    console.dir(ModuleFederationPlugin);
    if (!config.plugins) {
        config.plugins = [];
    }
    config.plugins.push(
        new ModuleFederationPlugin({
            name: "react_mfe",
            library: {type: "var", name: "react_app"},
            filename: "remoteEntry.js",
            exposes: {
                "App": "./src/App"
            },
            shared: [{"react": {singleton: true, eager: true}}, {"react-dom": {singleton: true, eager: true}}]
        }),
    );
    return config;
}
