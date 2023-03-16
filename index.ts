import dotenv from 'dotenv'
dotenv.config()

import express, {Express, NextFunction, Request, Response} from 'express';
import {applyAuth} from './auth'

export const APP: Express = express();
const PORT: number = +(process.env.PORT || 8080);

APP.use(express.json())

applyAuth(APP)

APP.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});