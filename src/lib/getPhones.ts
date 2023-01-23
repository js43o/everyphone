import connectMongo from 'lib/connectMongo';
import { Phone, SearchPhoneQuery } from 'lib/types';
import PhoneModel from 'models/Phone';
import { ITEM_PER_PAGE } from './constants';

export default async function getPhones(props: {
  options?: SearchPhoneQuery;
  page?: number;
}): Promise<{ phones: Phone[]; lastPage: Number }> {
  try {
    await connectMongo();

    if (!props.options) {
      const phones = await PhoneModel.find().limit(10).exec();
      const lastPage = Math.ceil(
        (await PhoneModel.countDocuments().exec()) / ITEM_PER_PAGE
      );

      return { phones, lastPage };
    }

    const { manufacturer, height, storage, battery, weight } = props.options;
    const page = props.page || 1;

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
      .limit(ITEM_PER_PAGE)
      .skip((page - 1) * ITEM_PER_PAGE)
      .exec();

    return { phones, lastPage };
  } catch (err: any) {
    throw err;
  }
}
