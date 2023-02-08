import connectMongo from 'utils/db/connectMongo';
import PhoneModel from 'utils/db/models/Phone';
import { Phone } from 'utils/types';

export default async function getPhoneByName(name: string): Promise<Phone> {
  try {
    await connectMongo();
    const phone = await PhoneModel.find({ name }).exec();
    return phone[0];
  } catch (err: any) {
    throw err;
  }
}
