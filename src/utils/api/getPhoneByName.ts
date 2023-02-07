import connectMongo from 'utils/api/connectMongo';
import { Phone } from 'utils/types';
import PhoneModel from 'utils/models/Phone';

export default async function getPhoneByName(name: string): Promise<Phone> {
  try {
    await connectMongo();
    const phone = await PhoneModel.find({ name }).exec();
    return phone[0];
  } catch (err: any) {
    throw err;
  }
}
