import { Schema, Document, Model, Connection} from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export interface IUserAttributes {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserSchema extends Schema {

}

export interface IUserModel extends IUserAttributes, Document {
  isPassword(password: string, encodePassword: string): boolean;
}

export default (conn: Connection): Model<IUserModel> => {
  
  const DataTypes = Schema.Types;
  const UserSchema: IUserSchema = new Schema({
    id: {
      type: DataTypes.ObjectId,
      unique: true
    },
    name: {
      type: DataTypes.String,
      required: true,
    },
    email: {
      type: DataTypes.String,
      required: true,
      unique: true
    },
    password: DataTypes.String,
  });
  
  UserSchema.pre('save', function(this: IUserModel, next) {
    const salt = genSaltSync();    
    this.password = hashSync(this.password, salt);
    next();
  });  

  UserSchema.pre('update', function(this: IUserModel, next): void {
    if (this.password) {   
      console.log(this.password);   
      //const salt = genSaltSync();
      //this.password = hashSync(this.password, salt);
    }
    next();
  });
  
  UserSchema.methods.isPassword = (password: string, encodePassword: string) => {
    return compareSync(password, encodePassword);
  };

  const User = conn.model<IUserModel>('User', UserSchema);

  return User;
}