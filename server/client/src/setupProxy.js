const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy(['/user','/api', '/auth/google', '/auth/user'], { target: 'http://localhost:5000' }));
};