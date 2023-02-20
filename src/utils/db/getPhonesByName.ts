import connectMongo from 'utils/db/connectMongo';
import PhoneModel from 'utils/db/models/Phone';
import { Phone } from 'utils/types';

export default async function getPhonesByName(
  names: string[]
): Promise<Phone[]> {
  try {
    await connectMongo();
    const phone = await PhoneModel.find({ name: { $in: names } }).exec();
    return phone;
  } catch (err: any) {
    throw err;
  }
}
