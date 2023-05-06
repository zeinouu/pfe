import mongoose from 'mongoose';
const { Schema } = mongoose;

const connectionSchema = new mongoose.Schema({
  server: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  authDatabase: {
    type: String,
  },
  authMechanism: {
    type: String,
  }
  ,
  URI: {
    type: String,
    require: true
  }
});

export default mongoose.model("Connection", connectionSchema)