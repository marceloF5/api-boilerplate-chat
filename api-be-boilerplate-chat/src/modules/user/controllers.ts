import { Request, Response, NextFunction, Application } from 'express';
import * as _ from 'lodash';

import Handlers from '../../utils/handlers';
import User from './services';

class UserController {

    constructor() { }

    async getAllUsers(req: Request, res: Response) {
        try {            
            Handlers.onSuccess(res, await User.getAll());
        } catch (error) {            
            Handlers.onError(res, `Error to GET Users`, error);
        }
        
        //res.status(200).json({ payload: x }); 
        //User.getAll();
            //.then(_.partial(Handlers.onSuccess, res))        
            //.catch(_.partial(Handlers.onError, res, `Error to GET Users`))
    }

    createUser(req: Request, res: Response) {
        req.body = {
            "name": "marcelo",
            "email": "mp.fortunato@gmail.com",
            "password": "1234"
        }
        User.create(req.body)
            .then(_.partial(Handlers.onSuccess, res))        
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, `Error to CREATE User`))
    }
}

export default new UserController();