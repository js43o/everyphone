import connectMongo from 'utils/db/connectMongo';
import PhoneModel from 'utils/db/models/Phone';
import { Phone } from 'utils/types';

export default async function getPhoneByUrl(url: string): Promise<Phone> {
  try {
    await connectMongo();
    const phone = await PhoneModel.find({ url }).exec();
    return phone[0];
  } catch (err: any) {
    throw err;
  }
}
