import connectMongo from 'utils/db/connectMongo';
import { Phone, FilterPhoneQuery } from 'utils/types';
import PhoneModel from 'utils/db/models/Phone';
import { ITEM_PER_PAGE, SORT_BY_QUERY } from '../constants';

export default async function getFilteredPhonesByPage(props: {
  options: FilterPhoneQuery;
  page: number;
}): Promise<{ phones: Phone[]; lastPage: Number }> {
  try {
    await connectMongo();

    const { manufacturer, height, storage, battery, weight, sortBy } =
      props.options;
    const page = props.page || 1;
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
