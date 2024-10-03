import http from 'http';
import { appendToFile, getFileData, getFileDataSync } from "./utils.js";

const eventsData = getFileData();
const baseURL = '/api/events';
let lastId = getFileDataSync() !== null ? getFileDataSync().length : 0;

const router = async (req, resp) => {
    const { url, method } = req;

    const sendJSONResponse = (statusCode, data) => {
        resp.setHeader("Content-Type", "application/json");
        resp.writeHead(statusCode);
        resp.end(JSON.stringify(data));
    };

    // get all event in JSON
    if (url === baseURL && method === 'GET') {
        eventsData.then(data => {
            lastId = data.length;
            sendJSONResponse(200, data);
        });
    }

    if (url.match(/\/api\/events\/\d+/) && method === 'GET') {
        let id = url.split('/').pop();
        id = parseInt(id, 10);

        eventsData.then(data => {
            const event = data.find(obj => obj.id === id);
            sendJSONResponse(200, event);
        });
    }

    if (url === baseURL + '/add' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { imageUrl, title, price, date, location, company } = JSON.parse(body);

            const newData = {
                imageUrl, title, price, date, location, company, id: ++lastId
            }

            appendToFile(newData).then(() => {
                sendJSONResponse(201, { message: 'Added event successfully!' });
            }).catch(err => {
                sendJSONResponse(400, { message: 'Could not add data!' });
            })
        })
    }

};

const server = http.createServer(router);

server.listen(8080);
