// simple hello world route
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, resp) => {
    resp.send('Hello Express!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
