import * as mongoose from 'mongoose';
import Assembly from '../../domain/assembly/Assembly';

const assemblySchema = new mongoose.Schema({
    name: String,
    date: Date,
    code: Number,
    active: Boolean
  });
  
  const assemblyModel = mongoose.model<Assembly & mongoose.Document>('Assembly', assemblySchema);
  
  export default assemblyModel;