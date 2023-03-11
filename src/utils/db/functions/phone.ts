import { ITEM_PER_PAGE, SORT_BY_QUERY } from 'utils/constants';
import connectMongo from 'utils/db/functions/connectMongo';
import PhoneModel from 'utils/db/models/Phone';
import { FilterPhoneQuery, Phone } from 'utils/types';

export async function getPhoneByName(name: string): Promise<Phone> {
  try {
    await connectMongo();
    const phone = await PhoneModel.findOne({ name }).exec();
    return phone;
  } catch (err: any) {
    throw err;
  }
}

export async function getPhonesByName(names: string[]): Promise<Phone[]> {
  try {
    await connectMongo();
    const phone = await PhoneModel.find({ name: { $in: names } }).exec();
    return phone;
  } catch (err: any) {
    throw err;
  }
}

export async function getPhoneByUrl(url: string): Promise<Phone> {
  try {
    await connectMongo();
    const phone = await PhoneModel.findOne({ url }).exec();
    return phone;
  } catch (err: any) {
    throw err;
  }
}

export async function getPhonesByLimit(
  limit: number
): Promise<{ phones: Phone[]; lastPage: number }> {
  try {
    await connectMongo();
    const phones: Phone[] = await PhoneModel.find({})
      .sort(SORT_BY_QUERY.get('latest'))
      .limit(limit)
      .exec();
    const lastPage = Math.ceil(
      (await PhoneModel.countDocuments().exec()) / ITEM_PER_PAGE
    );

    return { phones, lastPage };
  } catch (err: any) {
    throw err;
  }
}

export async function getFilteredPhonesByPage(
  options: FilterPhoneQuery,
  page: number
): Promise<{ phones: Phone[]; lastPage: Number }> {
  try {
    await connectMongo();

    const { manufacturer, height, storage, battery, weight, sortBy } = options;
    const sorting = SORT_BY_QUERY.get(sortBy);

    const query = PhoneModel.find({
      manufacturer: {
        $in: manufacturer,
      },
      'design.demension.0': {
        $gte: height[0],
        $lte: height[1],
      },
      'hardware.storage': {
        $gte: storage[0],
        $lte: storage[1],
      },
      'hardware.battery': {
        $gte: battery[0],
        $lte: battery[1],
      },
      'design.weight': {
        $gte: weight[0],
        $lte: weight[1],
      },
    });

    const lastPage = Math.ceil(
      (await query.clone().countDocuments().exec()) / ITEM_PER_PAGE
    );
    const phones = await query
      .sort(sorting)
      .limit(ITEM_PER_PAGE)
      .skip((page - 1) * ITEM_PER_PAGE)
      .exec();

    return { phones, lastPage };
  } catch (err: any) {
    throw err;
  }
}
