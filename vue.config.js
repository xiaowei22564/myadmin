module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://127.0.0.1:8011',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}