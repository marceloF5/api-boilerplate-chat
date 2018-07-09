import { Mongoose } from 'mongoose';

import { IModels } from './models.interface';

export interface IDbConnection extends IModels {
    mongoose: Mongoose;
}