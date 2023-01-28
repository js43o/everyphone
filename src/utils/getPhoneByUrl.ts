import connectMongo from 'utils/connectMongo';
import { Phone } from 'utils/types';
import PhoneModel from 'models/Phone';

export default async function getPhoneByUrl(url: string): Promise<Phone> {
  try {
    await connectMongo();

    const phone = await PhoneModel.find({ url }).exec();
    return phone[0];
  } catch (err: any) {
    throw err;
  }
}
