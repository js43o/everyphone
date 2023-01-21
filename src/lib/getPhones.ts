import connectMongo from 'lib/connectMongo';
import { Phone, SearchPhoneQuery } from 'lib/types';
import PhoneModel from 'models/Phone';

export default async function getPhones(
  props?: SearchPhoneQuery
): Promise<Phone[]> {
  try {
    await connectMongo();
    if (!props) return await PhoneModel.find();

    const query = PhoneModel.find({
      manufacturer: {
        $in: props.manufacturer,
      },
      'design.demension.0': {
        $gte: props.height[0],
        $lte: props.height[1],
      },
      'hardware.storage': {
        $gte: props.storage[0],
        $lte: props.storage[1],
      },
      'hardware.battery': {
        $gte: props.battery[0],
        $lte: props.battery[1],
      },
      'design.weight': {
        $gte: props.weight[0],
        $lte: props.weight[1],
      },
    });

    return await query.exec();
  } catch (err: any) {
    throw err;
  }
}
