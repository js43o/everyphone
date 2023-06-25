import mongoose from 'mongoose';

type Connection = {
  isConnected: mongoose.ConnectionStates;
};

const { MONGO_URI } = process.env;
const connection: Connection = {
  isConnected: 0,
};

const connectMongo = async () => {
  if (connection.isConnected) return;

  if (!MONGO_URI) {
    console.log('MONGO_URI IS NOT VALID');
    return;
  }

  console.log('CONNECTING TO MONGO...');
  try {
    const db = await mongoose.connect(MONGO_URI);
    mongoose.set('strictQuery', false);
    console.log('CONNECTED TO MONGO!');

    connection.isConnected = db.connections[0].readyState;
  } catch (e) {
    console.log('CONNECTION ERROR');
    console.error(e);
  }
};

export default connectMongo;
