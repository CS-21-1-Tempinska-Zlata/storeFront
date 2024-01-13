import express from "express";
import cors from 'cors';

import * as categoryController from './controllers/category.js';
import * as goodController from './controllers/good.js';

const PORT = 3010;

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({msg: "Root route"});
});

app.get('/categories', categoryController.getAll);


app.get('/goods', goodController.getAll);
app.get('/goods/:partitionKey', goodController.getAllInOneCategory);


app.listen(process.env.PORT | PORT, () => {
    console.log("Server listens on port", PORT);
});