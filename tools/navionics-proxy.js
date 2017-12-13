var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('referer', 'https://webapp.navionics.com/?lang=en');
    proxyReq.setHeader('host', 'backend.navionics.io');
});

http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://backend.navionics.io/' });
}).listen(3000);