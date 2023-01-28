import connectMongo from 'utils/connectMongo';
import { SearchPhoneResult } from 'utils/types';
import PhoneModel from 'models/Phone';

export default async function searchPhonesByName(
  input: string
): Promise<SearchPhoneResult[]> {
  try {
    await connectMongo();
    const flattend = input.toLowerCase().replace(/\s+/g, '');
    const regExp = new RegExp(
      ['\\s*', flattend.split('').join('\\s*'), '\\s*']
        .join('')
        .replace(/\+/g, '\\+'),
      'ig'
    );

    const searchResult = await PhoneModel.find(
      { name: { $regex: regExp } },
      { _id: false, name: true, manufacturer: true, url: true }
    ).exec();

    return searchResult;
  } catch (err: any) {
    throw err;
  }
}
