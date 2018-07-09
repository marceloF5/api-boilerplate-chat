import { Request, Response, Application } from 'express';

import UserController from './controllers';
import Auth from '../../utils/services/auth.service';
import { IRoutes } from '../../interfaces/routes.interface';

export class UserRoutes implements IRoutes {

    constructor() { }

    initRoute(app: Application): void {
        app.route('/api/users/all').all(Auth.authorize).get(this.getAllUsers);
        app.route('/api/users/create').all(Auth.authorize).post(this.createUser);
    }

    private getAllUsers(req: Request, res: Response) {
        return UserController.getAllUsers(req, res)
    }

    private createUser(req: Request, res: Response) {
        return UserController.createUser(req, res);
    }
}

export default new UserRoutes();