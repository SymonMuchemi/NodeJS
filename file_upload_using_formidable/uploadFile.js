const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

const fetchHTML = (filename) => {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        return data;
    } catch (error) {
        console.log(`Error reading the ${filename} file: ${error}`);
        return null;
    }
}

http.createServer((req, resp) => {
    const data = fetchHTML('upload.html');

    if (data === null) {
        resp.writeHead(404, { 'Content-Type': 'text/html' });
        return resp.end("Could not load html file");
    }

    if (req.url === '/fileupload' && req.method.toLowerCase() === 'post') {
        const form = new formidable.IncomingForm();
        form.uploadDir = './uploadedFiles'; // Specify upload directory
        form.keepExtensions = true; // Keep the original file extension

        form.parse(req, (err, fields, files) => {
            if (err) {
                resp.writeHead(500, { 'Content-Type': 'text/html' });
                return resp.end('Error parsing the form!');
            }

            // `files.filetoupload.filepath` or `files.filetoupload.path` can vary based on the `formidable` version
            const oldPath = files.filetoupload.filepath || files.filetoupload.path;
            const newPath = form.uploadDir + '/' + files.filetoupload.originalFilename;

            if (!oldPath) {
                resp.writeHead(400, { 'Content-Type': 'text/html' });
                return resp.end('File upload failed!');
            }

            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;

                resp.write("File uploaded successfully!");
                resp.end();
            });
        });
    } else {
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write(data);

        return resp.end();
    }
}).listen(8080);
