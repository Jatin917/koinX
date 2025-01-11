import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Connection } from './DB/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

Connection();
app.listen(PORT, ()=>{
    console.log("Server is running on port ", PORT);
})