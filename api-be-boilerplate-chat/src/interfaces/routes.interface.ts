import { Application } from 'express';

import { IDbConnection } from './dbConnection.interface';
import { IModels } from './models.interface';

export interface IRoutes {    
    initRoute(app: Application): void;
}