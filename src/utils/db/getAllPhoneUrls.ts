import connectMongo from 'utils/db/connectMongo';
import PhoneModel from 'utils/db/models/Phone';
import { Phone } from 'utils/types';

export default async function getAllPhoneUrls(): Promise<string[]> {
  try {
    await connectMongo();
    const phones: Phone[] = await PhoneModel.find({}).exec();
    return phones.map((phone) => phone.url);
  } catch (err: any) {
    throw err;
  }
}
