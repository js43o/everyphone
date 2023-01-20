import connectMongo from 'lib/connectMongo';
import PhoneModel from 'models/Phone';
import { Phone } from 'lib/types';

export default async function getAllPhones(): Promise<Phone[]> {
  try {
    console.log('CONNECTING TO MONGO...');
    await connectMongo();
    console.log('CONNECTED TO MONGO!');

    const phones: Phone[] = await PhoneModel.find();
    return phones;
  } catch (err: any) {
    throw err;
  }
}
