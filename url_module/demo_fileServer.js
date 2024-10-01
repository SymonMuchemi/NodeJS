const fs = require('fs');
const http = require('http');
const url = require('url');

http.createServer((req, resp) => {
    const q = url.parse(req.url, true);
    const filename = q.pathname.replace('/', '');

    fs.readFile(filename, (err, data) => {
        if (err) {
            resp.writeHead(404, { 'Content-Type': 'text/html' });
            return resp.end("404 Not Found");
        }
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write(data);

        return resp.end();
    });
}).listen(8080);
