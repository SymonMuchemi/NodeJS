// simple route
import express, { Request, Application, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.get('/', (req: Request, resp: Response) => {
    resp.send("Hello from TypeScript-Express");
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
