import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

const connectMongo = async () => mongoose.connect(MONGO_URI!);

export default connectMongo;
