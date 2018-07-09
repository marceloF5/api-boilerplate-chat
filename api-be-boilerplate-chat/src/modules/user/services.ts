import { Request, Response, Application } from 'express';
import * as Bluebird from 'bluebird';

import db from '../../models/config.models';
import { IUserAttributes } from '../../models/user.model';

import Handlers from '../../utils/handlers';

export class UserServices {
    
    constructor() { }

    getAll(): Bluebird<IUserAttributes> {                 
        return db.User
            .find()
            .select('name email');
        //return db.mongoose.connection.collection('users').find();
    }

    getById(id): Bluebird<IUserAttributes> {                 
        return db.User
            .findById({'_id': id})
            .select('name email');        
    }

    getByEmail(email): Bluebird<IUserAttributes> {                 
        return db.User
            .find({'email': email})
            .select('name email');        
    }

    create(user: IUserAttributes){                                                               
        return new db.User(user).save();
    }
}

export default new UserServices();