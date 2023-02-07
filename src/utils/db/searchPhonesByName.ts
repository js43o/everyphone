import connectMongo from 'utils/db/connectMongo';
import { SearchPhoneResult } from 'utils/types';
import PhoneModel from 'utils/db/models/Phone';

export default async function searchPhonesByName(
  input: string
): Promise<SearchPhoneResult[]> {
  try {
    await connectMongo();
    const flattend = input.toLowerCase().replace(/\s+/g, '');
    const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(input);
    const regExp = new RegExp(
      ['\\s*', flattend.split('').join('\\s*'), '\\s*']
        .join('')
        .replace(/\+/g, '\\+'),
      'ig'
    );

    const searchResult = await PhoneModel.find(
      hasKorean
        ? { korName: { $regex: regExp } }
        : { name: { $regex: regExp } },
      { _id: false, name: true, manufacturer: true, url: true }
    ).exec();

    return searchResult;
  } catch (err: any) {
    throw err;
  }
}
