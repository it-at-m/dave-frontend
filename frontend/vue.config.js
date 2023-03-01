module.exports = {
  transpileDependencies: ['vuetify', 'vue-echarts'],
  pwa: {
    name: 'DAVe Datenportal',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
};