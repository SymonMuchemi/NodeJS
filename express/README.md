# Express

## Installation

To install Express, you need to have Node.js and npm installed. If you don't have them installed, you can download and install them from the official website: [Node.js](https://nodejs.org/).

To install Express, run the following commands:

1. Create a directory for your project:

```bash
mkdir my-express-app
cd my-express-app
```

1. Initialize a new Node.js project:

```bash
npm init -y
```

1. Install Express:

```bash
npm install express
```

## Hello World Example

Create a file named `app.js` and add the following code to set up a basic Express server with a "Hello World" route:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

To run the server, use the following command:

```bash
node app.js
```

You should see the message `Example app listening at http://localhost:3000` in your terminal. Open your browser and navigate to `http://localhost:3000` to see the "Hello World!" message.
