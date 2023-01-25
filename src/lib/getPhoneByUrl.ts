import connectMongo from 'lib/connectMongo';
import { Phone } from 'lib/types';
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
