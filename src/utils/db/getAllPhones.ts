import { ITEM_PER_PAGE, SORT_BY_QUERY } from 'utils/constants';
import connectMongo from 'utils/db/connectMongo';
import PhoneModel from 'utils/db/models/Phone';
import { Phone } from 'utils/types';

export default async function getAllPhones(
  limit?: number
): Promise<{ phones: Phone[]; lastPage: number }> {
  try {
    await connectMongo();
    const phones: Phone[] = await PhoneModel.find({})
      .sort(SORT_BY_QUERY.get('latest'))
      .limit(limit || 0)
      .exec();
    const lastPage = Math.ceil(
      (await PhoneModel.countDocuments().exec()) / ITEM_PER_PAGE
    );

    return { phones, lastPage };
  } catch (err: any) {
    throw err;
  }
}
