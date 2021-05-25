module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/open-balena-dashboard/' : '/',
    pwa: {
        themeColor: "#00d2ea",
        msTileColor: "#130f40",
        name: "Open Balena Dashboard",
        short_name: "OB Dash",
        workboxPluginMode: "GenerateSW",//"InjectManifest",
        workboxOptions: {
            // swSrc: "src/service-worker.js"
        }
    }
}
