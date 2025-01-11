import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Connection } from './DB/index.js';
import router from './Router/router.js';
import { schedulerFunction } from './Controller/updatingPrice.js';

dotenv.config();
const app = express();
app.use(cors());
app.use('/', router);
const PORT = process.env.PORT || 8000;

Connection();
schedulerFunction();
app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
})