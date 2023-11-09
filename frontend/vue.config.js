module.exports = {
    transpileDependencies: ['vuetify'],
    pwa: {
        name: 'DAVe Datenportal',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js'
        }
    }
};