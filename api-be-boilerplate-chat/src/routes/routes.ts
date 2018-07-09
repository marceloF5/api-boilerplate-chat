import { Application } from 'express';

import DefaultRoutes from '../modules/default/routes';
import TokenRoutes from '../modules/token/routes';  
import UserRoutes from '../modules/user/routes';  

class Routes {

    constructor() { }

    initRoutes(app: Application) {
        DefaultRoutes.initRoute(app);
        TokenRoutes.initRoute(app);
        UserRoutes.initRoute(app);
    }
}

export default new Routes();