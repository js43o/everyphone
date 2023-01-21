import connectMongo from 'lib/connectMongo';
import PhoneModel from 'models/Phone';
import { Phone } from 'lib/types';

type SearchQuery = {
  manufacturer: string[];
  displayHeight: number[];
  storage: number[];
  battery: number[];
  weight: number[];
};

export default async function getPhones(props?: SearchQuery): Promise<Phone[]> {
  try {
    await connectMongo();
    if (!props) return await PhoneModel.find({});

    const query = PhoneModel.find({
      manufacturer: props.manufacturer,
      'design.demension.0': {
        $lte: props.displayHeight[0],
        $gte: props.displayHeight[1],
      },
      'hardware.storage': {
        $lte: props.storage[0],
        $gte: props.storage[1],
      },
      'hardware.battery': {
        $lte: props.battery[0],
        $gte: props.battery[1],
      },
      'hardware.weight': {
        $lte: props.weight[0],
        $gte: props.weight[1],
      },
    });

    return await query.exec();
  } catch (err: any) {
    throw err;
  }
}
