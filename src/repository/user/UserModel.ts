import * as mongoose from 'mongoose';
import User from '../../domain/user/User';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    active: Boolean
  });
  
  const userModel = mongoose.model<User & mongoose.Document>('EProcUser', userSchema);
  
  export default userModel;