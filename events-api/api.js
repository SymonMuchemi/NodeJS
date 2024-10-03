import fs from 'fs/promises';
import http from 'http';
import { appendToFile, getFileData } from "./utils.js";

const eventsData = getFileData();
const baseURL = '/api/events'

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

};

const server = http.createServer(router);

server.listen(8080);
