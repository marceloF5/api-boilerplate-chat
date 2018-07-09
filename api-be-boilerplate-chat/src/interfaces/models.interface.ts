import { Model } from 'mongoose';

import { IUserModel } from "../models/user.model";

export interface IModels {

    User: Model<IUserModel>;   

}