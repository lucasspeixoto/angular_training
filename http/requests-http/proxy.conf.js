// Configuração para o Angular conectar no backend sem o cors
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:8000/',
        secure: false,
        logLevel: 'debug',
        pathRewrite: {'^/api': ''}
    }
]

module.exports = PROXY_CONFIG

