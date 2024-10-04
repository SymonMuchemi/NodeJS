import http from 'http';
import { appendToFile, getFileData, updateElement, deleteElement } from "./utils.js";

let lastId = 0;

const baseURL = '/api/events';

const sendJSONResponse = (resp, statusCode, data) => {
    resp.setHeader("Content-Type", "application/json");
    resp.writeHead(statusCode);
    resp.end(JSON.stringify(data));
};

const router = async (req, resp) => {
    const { url, method } = req;

    try {
        const eventsData = await getFileData();
        lastId = eventsData.length > 0 ? Math.max(...eventsData.map(e => e.id)) : 0;

        if (url === baseURL && method === 'GET') {
            sendJSONResponse(resp, 200, eventsData);
        } else if (url.match(/\/api\/events\/\d+/) && method === 'GET') {
            const id = parseInt(url.split('/').pop(), 10);
            const event = eventsData.find(obj => obj.id === id);
            if (event) {
                sendJSONResponse(resp, 200, event);
            } else {
                sendJSONResponse(resp, 404, { message: 'Event not found' });
            }
        } else if (url === baseURL + '/add' && method === 'POST') {
            const body = await getRequestBody(req);
            const { imageUrl, title, price, date, location, company } = JSON.parse(body);
            const newData = { imageUrl, title, price, date, location, company, id: ++lastId };
            await appendToFile(newData);
            sendJSONResponse(resp, 201, { message: 'Added event successfully!' });
        } else if (url.match(/\/api\/events\/update\/\d+/) && method === 'PUT') {
            const id = parseInt(url.split('/').pop(), 10);
            const body = await getRequestBody(req);
            const updatedEvent = JSON.parse(body);
            await updateElement(id, updatedEvent);
            sendJSONResponse(resp, 200, { message: "Event updated successfully!" });
        } else if (url.match(/\/api\/events\/delete\/\d+/) && method === 'DELETE') {
            const id = parseInt(url.split('/').pop(), 10);
            await deleteElement(id);
            sendJSONResponse(resp, 200, { message: "Event Deleted successfully!" });
        } else {
            sendJSONResponse(resp, 404, { message: 'Not Found' });
        }
    } catch (error) {
        console.error('Error in router:', error);
        sendJSONResponse(resp, 500, { message: 'Internal Server Error', error: error.message });
    }
};

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (error) => {
            reject(new Error(`Error getting request body: ${error.message}`));
        });
    });
};

const server = http.createServer(router);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
