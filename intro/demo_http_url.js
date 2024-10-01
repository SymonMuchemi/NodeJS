var http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`You've hit the ${req.url} endpoint`);
    res.end()
}).listen(8080);
