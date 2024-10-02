import todos from "./db.js";
import http from "http";

const baseUrl = "/api/todos";
let lastId = todos.pop().id;

console.log(`Last id: ${lastId}`);

const sendJsonResponse = (resp, code, data) => {
    resp.writeHead(code, { "Content-Type": "application/json" });
    return resp.end(JSON.stringify(data));
};

const fetchTodos = (req, resp) => {
    if (req.url === baseUrl && req.method === "GET") {
        sendJsonResponse(resp, 200, todos);
        return;
    }

    if (req.url.match(/^\/api\/todos\/\d+$/) && req.method === "GET") {
        let id = req.url.split("/").pop();
        id = parseInt(id, 10);

        let data = todos.find((obj) => obj.id === id);
        if (data) {
            sendJsonResponse(resp, 200, data);
        } else {
            sendJsonResponse(resp, 404, { error: "Todo not found" });
        }
        return;
    }

    if (req.url.match(/^\/api\/todos\/update\/\d+$/) && req.method === "PUT") {
        let body = "";

        req.on("data", (chunk) => (body += chunk));

        req.on("end", () => {
            try {
                let id = req.url.split("/").pop();
                id = parseInt(id, 10);
                let todoToUpdate = todos.find((obj) => obj.id == id);
                const parsedData = JSON.parse(body);

                // update the todo
                todoToUpdate.title = parsedData.title;
                todoToUpdate.completed = parsedData.completed;

                sendJsonResponse(resp, 200, { message: "Updated todo successfully!" });
            } catch (error) {
                sendJsonResponse(resp, 400, {
                    message: "Error updating todo",
                    reason: error.toString(),
                });
            }
        });
    }

    if (req.url === baseUrl && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const parsedData = JSON.parse(body);
                const id = ++lastId;
                const title = parsedData.title;
                const completed = parsedData.completed || false;
                const newTodo = { id, title, completed };

                todos.push(newTodo);
                sendJsonResponse(resp, 201, {
                    message: "Todo added successfully!",
                    data: newTodo,
                });
            } catch (error) {
                sendJsonResponse(resp, 400, {
                    message: "Error adding todo!",
                    error: error.toString(),
                });
            }
        });
    }

    if (req.url.match(/^\/api\/todos\/delete\/\d+$/) && req.url.method === "DELETE") {
        const id = req.url.split('/').pop()
        id = parseInt(id, 10);
        const index = todos.findIndex((obj) => obj.id === id);

        if (index > -1) {
            todos.splice(index, 1);
            sendJsonResponse(resp, 204, { message: "Deleted todo successfully!" });
        } else {
            sendJsonResponse(resp, 400, {
                message: "Error deleting todo!",
                error: error.toString(),
            });
        }
    }
    sendJsonResponse(resp, 400, { Error: '400 bad request!' });
}


const server = http.createServer(fetchTodos);

server.listen(8080, () => {
    console.log("The server is running on port 8080!");
});
