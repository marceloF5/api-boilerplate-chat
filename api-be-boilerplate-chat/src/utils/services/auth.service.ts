import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

import Handlers from '../../utils/handlers';

const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(`${__dirname}./../../config/config.json`))[env];

class Auth {

    constructor() { }

    async generateToken(id: string): Promise<string> {             
        const payload = {sub: id};        
        return await jwt.sign(payload, config.secret, { expiresIn: '1d' });
    }

    async decodeToken(token: string) {  
        const data = await jwt.verify(token, config.secret);
        return data;
    }

    async authorize(req: Request, res: Response, next: NextFunction) {                                        
        try {
            const token = req.headers['authorization'] || req.body.token;                        
            if(!token || token === undefined) {                          
                Handlers.authFail(res, `There is no TOKEN!`, null);                
            } else {                
                // Why is it necessary new instance of Auth to call 'decodeToken' if I'm inside of the class?
                await new Auth().decodeToken(token);                                              
                Handlers.onNext(next);              
            }                        
        } catch(error) {  
            Handlers.authFail(res, error.message, error);          
        }        
    }


}

export default new Auth();