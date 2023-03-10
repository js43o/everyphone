import connectMongo from 'utils/db/functions/connectMongo';
import { SearchPhoneResult } from 'utils/types';
import PhoneModel from 'utils/db/models/Phone';
import { hasKorean } from 'utils/validator';

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
      hasKorean(input)
        ? { korName: { $regex: regExp } }
        : { name: { $regex: regExp } },
      { _id: false, name: true, manufacturer: true, url: true }
    ).exec();

    return searchResult;
  } catch (err: any) {
    throw err;
  }
}
