import todos from "./db.js";
import http from 'http';
import { v4 as uuidv4 } from 'uuid'; // Using uuid for unique ID generation

let todosList = [...todos]; // Maintain the state of todos

const router = async (req, res) => {
    const { url, method } = req;

    // Helper function to send JSON responses
    const sendJSONResponse = (statusCode, data) => {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.end(JSON.stringify(data));
    };

    // GET all todos
    if (url === "/api/todos" && method === "GET") {
        sendJSONResponse(200, todosList);
    }

    // GET a single todo by ID
    else if (url.match(/\/api\/todos\/\d+/) && method === "GET") {
        const id = parseInt(url.split("/")[3]);
        const todo = todosList.find((todo) => todo.id === id);

        if (todo) {
            sendJSONResponse(200, todo);
        } else {
            sendJSONResponse(404, { message: "Todo not found" });
        }
    }

    // POST (Create) a new todo
    else if (url === "/api/todos" && method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const { title, description, completed } = JSON.parse(body);
            const newTodo = {
                id: uuidv4(), // Generate a unique ID
                title,
                description,
                completed: completed || false
            };
            todosList.push(newTodo);
            sendJSONResponse(201, newTodo);
        });
    }

    // PUT (Update) a todo by ID
    else if (url.match(/\/api\/todos\/\d+/) && method === "PUT") {
        const id = parseInt(url.split("/")[3]);
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const { title, description, completed } = JSON.parse(body);
            const todoIndex = todosList.findIndex((todo) => todo.id === id);

            if (todoIndex !== -1) {
                const updatedTodo = { ...todosList[todoIndex], title, description, completed };
                todosList[todoIndex] = updatedTodo;
                sendJSONResponse(200, updatedTodo);
            } else {
                sendJSONResponse(404, { message: "Todo not found" });
            }
        });
    }

    // DELETE a todo by ID
    else if (url.match(/\/api\/todos\/\d+/) && method === "DELETE") {
        const id = parseInt(url.split("/")[3]);
        const todoIndex = todosList.findIndex((todo) => todo.id === id);

        if (todoIndex !== -1) {
            todosList = todosList.filter((todo) => todo.id !== id);
            sendJSONResponse(200, { message: "Todo deleted successfully" });
        } else {
            sendJSONResponse(404, { message: "Todo not found" });
        }
    }

    // If no route matches, send a 404 response
    else {
        sendJSONResponse(404, { message: "Route not found" });
    }
};

const server = http.createServer(router);

server.listen(8080, () => {
    console.log('The server is running on port 8080!');
})
