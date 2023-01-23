import mongoose from 'mongoose';

type Connection = {
  state: mongoose.ConnectionStates;
};

const { MONGO_URI } = process.env;
const connection: Connection = {
  state: 99,
};

const connectMongo = async () => {
  if (connection.state !== 0 && connection.state !== 99) return;

  console.log('CONNECTING TO MONGO...');
  try {
    const db = await mongoose.connect(MONGO_URI!);
    await db.set('strictQuery', true);
    console.log('CONNECTED TO MONGO!');

    connection.state = db.connections[0].readyState;
  } catch (e) {
    console.log('CONNECTION ERROR');
  }
};

export default connectMongo;
