import { Request, Response, Application } from 'express';

class DefaultRoutes {
    constructor() { }

    initRoute(app: Application): void {        
        app.route('/default').get(this.defaultRoute);
    }

    private defaultRoute(req, res) { 
        return res.status(200).send({status: true});
    }
}

export default new DefaultRoutes();